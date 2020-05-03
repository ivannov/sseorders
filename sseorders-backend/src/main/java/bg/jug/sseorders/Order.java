package bg.jug.sseorders;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Orders")
public class Order extends PanacheEntity {

    public String taskName;
    public int amount;
    public LocalDateTime timestamp;
    @ManyToOne
    public Contractor contractor;

}
