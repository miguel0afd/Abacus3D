/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cediant.util;

import com.novell.ldap.LDAPConnection;
import com.novell.ldap.LDAPEntry;
import com.novell.ldap.LDAPException;
import com.novell.ldap.LDAPSearchResults;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author miguel
 */
public class LdapConnection {
    
    LDAPConnection ldapc = new LDAPConnection();
    LdapPropHandler lph;
    
    public LdapConnection(LdapPropHandler lph){
        this.lph = lph;
    }
    
    public boolean connect(){
        System.out.println("Connecting");
        try {
            System.out.println(lph.getHost()+":"+lph.getPort());
            ldapc.connect(lph.getHost(), lph.getPort());
            if(ldapc.isConnected()){    
                System.out.println("Success");
            }
            return ldapc.isConnected();
        } catch (LDAPException ex) {
            Logger.getLogger(LdapConnection.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } 
    }
    
    public boolean bind(){
        System.out.println("Binding");
        try {
            System.out.println(StringUtil.formatDN(lph.getCn(), 
                                                   lph.getGroup(), 
                                                   StringUtil.splitDCs(lph.getDcs())));
            ldapc.bind(LDAPConnection.LDAP_V3, 
                       StringUtil.formatDN(lph.getCn(), 
                                           lph.getGroup(), 
                                           StringUtil.splitDCs(lph.getDcs())), 
                       lph.getPassword().getBytes());            
            if(ldapc.isBound()){    
                System.out.println("Success");
            }
            ldapc.bind(LDAPConnection.LDAP_V3,
                    "cn=Administrador,dc=abacus,dc=cediant,dc=es",
                    "Eur01mus".getBytes());
            return ldapc.isBound();
        } catch (LDAPException ex) {
            Logger.getLogger(LdapConnection.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } 
    }
    
    public boolean authenticate(String uid, String password){
        System.out.println("Authenticating");
        try {
            System.out.println("ou="+lph.getGroup()+","+StringUtil.formatDCs(
                    StringUtil.splitDCs(lph.getDcs()),
                    ','));
            System.out.println("uid="+uid);
            LDAPSearchResults rs = ldapc.search(
                    "ou="+lph.getGroup()+","+StringUtil.formatDCs(StringUtil.splitDCs(lph.getDcs()),','),
                    LDAPConnection.SCOPE_SUB,
                    "uid="+uid,
                    null, 
                    false);
            System.out.println(rs.getCount());
            if(rs.getCount()<1){
                return false;
            }  
            LDAPEntry entry = rs.next();
            System.out.println(entry.toString());
            String dn = entry.getDN(); 
            /*String passwordMD5 = null;
            if(uid.equalsIgnoreCase("tabacus")){
                MD5Util md5util = new MD5Util();
                passwordMD5 = md5util.encrypt(password);                
            }
            passwordMD5 = "{MD5}"+passwordMD5;*/
            System.out.println(dn);
            //System.out.println(passwordMD5); {MD5}CY9rzUYh03PK3k6DJie09g==
            System.out.println(password);
            ldapc.bind(LDAPConnection.LDAP_V3, dn, password.getBytes());
            ////////////////////////////////////////////////////////////////////
            /*
            Security.addProvider(new com.novell.sasl.client.SaslProvider());
            String[]  mechanisms = {"DIGEST-MD5"};
            ldapc.bind(dn, 
                       "dn: "+dn, 
                       mechanisms, 
                       null, 
                       new BindCallbackHandler(password));
                       * */
            ////////////////////////////////////////////////////////////////////
            System.out.println(ldapc.getAuthenticationDN());
            return dn.compareToIgnoreCase(ldapc.getAuthenticationDN()) == 0;
        } catch (LDAPException ex) {
            Logger.getLogger(LdapConnection.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } /*catch (UnsupportedEncodingException ex){
            Logger.getLogger(LdapConnection.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }*/
    }
    
    public boolean isConnected(){
        return ldapc.isConnected();
    }
    
    public boolean isBound(){
        return ldapc.isBound();    
    }
    
    public boolean disconnect(){
        try {
            ldapc.disconnect();
            return !ldapc.isConnected();
        } catch (LDAPException ex) {
            Logger.getLogger(LdapConnection.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } 
    }
    
}
