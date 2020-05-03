package bg.jug.sseorders;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Contractor extends PanacheEntity {

    public String name;

}
