package es.cediant.db;
// Generated Aug 20, 2013 12:24:22 PM by Hibernate Tools 3.2.1.GA

import java.util.Date;

/**
 * RunProcs generated by hbm2java
 */
public class RunProcs  implements java.io.Serializable {
    
    private static final long serialVersionUID = -8775879491347254876L;

    private Integer idRunProcs;
    private Date date;
    private Integer num;
    private String type;

    public RunProcs() {
    }

    public RunProcs(Date date, Integer num, String type) {
        this.date = date;
        this.num = num;
        this.type = type;
    }

    public Integer getIdRunProcs() {
        return this.idRunProcs;
    }

    public void setIdRunProcs(Integer idRunProcs) {
        this.idRunProcs = idRunProcs;
    }
    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public Integer getNum() {
        return this.num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

}


