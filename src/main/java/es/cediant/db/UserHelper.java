/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cediant.db;

import es.cediant.util.StringUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author miguel
 */
public class UserHelper {
    
    private static Session session = null;
    
    public UserHelper(){
        //UserHelper.session = HibernateUtil.getSessionFactory().getCurrentSession(); 
        session = HibernateUtil.getSessionFactory().openSession();
    }
    
    public User getUser(String username){
        List<User> list = null;
        Transaction tx = session.beginTransaction();
        Query q = session.createQuery("FROM User U WHERE U.userName='"+username+"'");
        list = (List<User>) q.list();
        session.getTransaction().commit();
        if(list.size()>0){
            return list.get(0);
        } else {
            return null;
        }
    }
    
    public boolean usernameAlreadyExists(String username){
        if (getUser(username) == null){
            return false;
        } 
        return true;       
    }

    public void addUser(String username, String password) {
        Transaction tx = null;
        tx = session.beginTransaction();
        User user = new User(username, password);
        session.save(user);
        tx.commit();
    }
    
    public boolean checkCredentials(String username, String password){
        User user = getUser(username);
        if(user == null){
            return false;
        } else if(user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }

    public void removeUser(String username) {
        Transaction tx = null;
        tx = session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class);
        User user = (User) criteria.add(Restrictions.eq("userName", username)).uniqueResult();
        session.delete(user);
        tx.commit();
    }

    public void updateLastConnection(String username, Date date) {
        Transaction tx = null;
        tx = session.beginTransaction();
        Query query = session.createQuery("UPDATE User SET lastConnection = :lastConn WHERE userName = :user");
        query.setParameter("lastConn", date);
        query.setParameter("user", username);
        //UPDATE `AbacusDB`.`User` SET `lastConnection`='2013-07-01 12:10:23' WHERE `userName`='admin';
        query.executeUpdate();
        tx.commit();
    }

    public ArrayList<String> getRoles(String username) {
        User user = getUser(username);
        String strRoles = user.getRole();
        ArrayList<String> roles = new ArrayList<String>();
        String[] result = StringUtil.splitDCs(strRoles);
        roles.addAll(Arrays.asList(result));
        return roles;
    }
    
    public void addRole(String username, String role){
        ArrayList<String> roles = new ArrayList<String>();
        roles = getRoles(username);
        if(!roles.contains(role)){            
            Transaction tx = null;
            tx = session.beginTransaction();
            Query query = session.createQuery("UPDATE User SET Role = :role WHERE userName = :user");
            query.setParameter("role", roles.toString().substring(1, roles.toString().length()-1)+", "+role);
            query.setParameter("user", username);        
            query.executeUpdate();
            //System.out.println(roles.toString().substring(1, roles.toString().length()-1)+", "+role);
            tx.commit();
        }
    }
    
}
