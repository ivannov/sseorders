package bg.jug.sseorders;

import io.quarkus.panache.common.Sort;
import io.reactivex.Flowable;
import org.jboss.resteasy.annotations.SseElementType;
import org.reactivestreams.Publisher;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.List;

@Path("/order")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {

    @Inject
    OrdersQueue ordersQueue;

    @POST
    @Path("/{contractorName}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public void createOrder(@PathParam("contractorName") String contractorName, Order order) {
        Contractor contractor = Contractor.find("name", contractorName).firstResult();
        if (contractor != null) {
            order.contractor = contractor;
            order.timestamp = LocalDateTime.now();
            order.persist();
            ordersQueue.enqueueOrder(contractorName, order);
        }
    }

    @GET
    public List<Order> getOrdersForContractor(@QueryParam("contractor") String contractor) {
        return Order.find("contractor.name", Sort.by("timestamp").descending(), contractor).list();
    }

    @GET
    @Path("stream")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @SseElementType(MediaType.APPLICATION_JSON)
    public Publisher<Order> streamOrders(@QueryParam("contractor") String contractorName) {
        return Flowable.generate(emitter -> emitter.onNext(ordersQueue.waitForOrder(contractorName)));
    }
}
