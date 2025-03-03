package com.cs458.part1.Entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    String Id;
    String Name;
    String Surname;
    String Email;
    String PhoneNumber;
    LocalDate DateOfBirth;
    String Password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return Collections.emptyList();
    }
    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return Password;
    }
    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return Email;
    }
}
