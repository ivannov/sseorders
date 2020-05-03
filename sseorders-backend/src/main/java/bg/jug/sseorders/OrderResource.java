package bg.jug.sseorders;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Sort;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.List;

@Path("/order")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {

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
        }
    }

    @GET
    public List<Order> getOrdersForContractor(@QueryParam("contractor") String contractor) {
        return Order.find("contractor.name", Sort.by("timestamp").descending(), contractor).list();
    }
}
