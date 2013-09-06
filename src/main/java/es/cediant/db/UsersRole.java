package es.cediant.db;
// Generated Sep 6, 2013 3:28:29 PM by Hibernate Tools 3.2.1.GA



/**
 * UsersRole generated by hbm2java
 */
public class UsersRole  implements java.io.Serializable {
    
    private static final long serialVersionUID = -8344094788971134496L;

    private Integer idUsersRole;
    private User user;
    private Role role;

    public UsersRole() {
    }

    public UsersRole(User user, Role role) {
       this.user = user;
       this.role = role;
    }
   
    public Integer getIdUsersRole() {
        return this.idUsersRole;
    }
    
    public void setIdUsersRole(Integer idUsersRole) {
        this.idUsersRole = idUsersRole;
    }
    
    public User getUser() {
        return this.user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Role getRole() {
        return this.role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }

}

