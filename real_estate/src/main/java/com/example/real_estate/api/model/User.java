// package com.example.real_estate.api.model;

// import jakarta.persistence.*;
// import java.util.Set;
// import lombok.*;

// @Entity
// @Table(name = "users")
// @Getter
// @Setter
// public class User {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String username;
//     private String password;

//     @ManyToMany(fetch = FetchType.EAGER)
//     @JoinTable(
//         name = "user_roles",
//         joinColumns = @JoinColumn(name = "user_id"),
//         inverseJoinColumns = @JoinColumn(name = "role_id")
//     )
//     private Set<Role> roles;

//     public User() {}

//     public User(String username, String password, Set<Role> roles) {
//         this.username = username;
//         this.password = password;
//         this.roles = roles;
//     }

//     // Getters and Setters
// }
package com.example.real_estate.api.model;

import jakarta.persistence.*;
import java.util.Set;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    // ✅ Default Constructor (Required for JPA)
    public User() {}

    // ✅ Constructor for Registration with Role
    public User(String username, String password, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // ✅ 🔥 NEW Constructor (Fix for your issue)
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
