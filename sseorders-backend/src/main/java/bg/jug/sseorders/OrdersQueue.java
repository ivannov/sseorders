package bg.jug.sseorders;

import javax.inject.Singleton;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Singleton
public class OrdersQueue {

    private Map<String, BlockingQueue<Order>> contractOrders = new HashMap<>();

    public void enqueueOrder(String contractor, Order order) {
        try {
            obtainQueue(contractor).put(order);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public Order waitForOrder(String contractor) {
        try {
            return obtainQueue(contractor).take();
        } catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    private BlockingQueue<Order> obtainQueue(String contractor) {
        String contractorKey = contractor.toLowerCase();
        return contractOrders.putIfAbsent(contractorKey, new ArrayBlockingQueue<>(100));
    }
}
