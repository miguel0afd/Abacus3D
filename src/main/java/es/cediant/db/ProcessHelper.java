/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cediant.db;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import java.util.logging.Level;
import java.util.logging.Logger;
import es.cediant.db.Process;

/**
 *
 * @author miguel
 */
public class ProcessHelper {
    
    //private static Session session = null;
    private static SessionFactory factory = null;
    
    public ProcessHelper(){
        //session = HibernateUtil.getSessionFactory().openSession();
        factory = HibernateUtil.getSessionFactory();
    }
    
    /* Method to  READ all the employees */
    public List listProcesses(){
        //System.out.println("Listing all processes...");
        Session session = factory.openSession();
        Transaction tx = null;
        List processes = null;
        try {
            tx = session.beginTransaction();
            processes = session.createQuery("FROM Process").list();
            /*for (Iterator iterator = processes.iterator(); iterator.hasNext();){
                Process process = (Process) iterator.next();  
            }*/
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close(); 
            /*
            if(processes!=null){
                System.out.println(processes.size()+" processes found");
            }
            */
            return processes;
        }
    }
    
    public List listProcesses(String field, String value){
        Session session = factory.openSession();
        Transaction tx = null;
        List processes = null;
        try {
            tx = session.beginTransaction();
            processes = session.createQuery("FROM Process P WHERE P."+field+" = '"+value+"'").list();            
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close(); 
            /*
            if(processes!=null){
                System.out.println(processes.size()+" processes found");
            }
            */
            return processes;
        }
    }
    
    public Process getProcess(int id) {        
        Session session = factory.openSession();
        Transaction tx = null;
        Process proc = null;
        try {
            tx = session.beginTransaction();
            proc = (Process) session.createQuery("FROM Process p WHERE p.idProcess="+id).list().get(0);            
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close();             
            return proc;
        }
    }

    public int addProc(Process process) {
        Session session = factory.openSession();
        Transaction tx = null;
        int procId = 0;
        try {
            tx = session.beginTransaction();
            procId = (Integer) session.save(process); 
            System.out.println("New process: "+procId);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close();    
            return procId;
        }
    }

    public void modify(Integer idProcess, String newAction) {
        if(newAction.equalsIgnoreCase("cancel")){
            remove(idProcess);
        } else if(newAction.equalsIgnoreCase("force")) {
            start(idProcess);
        } else if(newAction.equalsIgnoreCase("finished")) {
            finish(idProcess);
        }
    }
    
    public void modify(Process process, String newAction) {
        if(newAction.equalsIgnoreCase("cancel")){
            remove(process.getIdProcess());
        } else if(newAction.equalsIgnoreCase("force")) {
            start(process.getIdProcess());
        } else if(newAction.equalsIgnoreCase("finished")) {
            finish(process.getIdProcess());
        }
    }

    private void remove(Integer idProcess) {
        Session session = factory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Process process = (Process) session.get(Process.class, idProcess);
            session.delete(process);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close();    
        }
    }

    private int start(Integer idProcess) {
        Session session = factory.openSession();
        Transaction tx = null;
        int procId = 0;
        try {
            tx = session.beginTransaction();
            Process process = (Process) session.get(Process.class, idProcess);
            process.setStartTime(new Date());
            process.setStatus("running");
            session.update(process);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close();    
            return procId;
        }
    }    
    
    private int finish(Integer idProcess) {
        Session session = factory.openSession();
        Transaction tx = null;
        int procId = 0;
        try {
            tx = session.beginTransaction();
            Process process = (Process) session.get(Process.class, idProcess);
            process.setStatus("finished");
            process.setEndTime(new Date());
            session.update(process);
            tx.commit();
        } catch (HibernateException ex) {
            if (tx!=null){
                tx.rollback();
            }
            Logger.getLogger(ProcessHelper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            session.close();    
            return procId;
        }
    }

    public List<Process> getLastProcesses(int num) {
        List<Process> lastProcesses = new ArrayList<Process>();
        List<Process> allProcesses = new ArrayList<Process>();
        allProcesses = listProcesses();
        int maxSize = (allProcesses.size()>num?num:allProcesses.size());
        for(int i=0; i<maxSize; i++){
            lastProcesses.add(allProcesses.get(i));
        }
        return lastProcesses;
    }       
    
}
