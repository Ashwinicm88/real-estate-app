// // package com.example.real_estate.api.config;

// // import com.example.real_estate.api.service.CustomUserDetailsService;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.SecurityFilterChain;

// // @Configuration
// // public class SecurityConfig {

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http
// //             .authorizeHttpRequests(auth -> auth
// //                 .requestMatchers("/", "/home", "/display-details", "/search-results").permitAll()
// //                 .requestMatchers("/add-property").hasRole("ADMIN")
// //                 .anyRequest().authenticated()
// //             )
// //             .formLogin(login -> login
// //                 .loginPage("/login")
// //                 .defaultSuccessUrl("/dashboard", true)
// //                 .permitAll()
// //             )
// //             .logout(logout -> logout
// //                 .logoutUrl("/logout")
// //                 .logoutSuccessUrl("/")
// //                 .invalidateHttpSession(true)
// //                 .deleteCookies("JSESSIONID")
// //                 .permitAll()
// //             )
// //             .sessionManagement(session -> session
// //                 .maximumSessions(1)
// //                 .maxSessionsPreventsLogin(false)
// //             );

// //         return http.build();
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }
// // }

// package com.example.real_estate.api.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.cors.CorsConfiguration;

// @Configuration
// @CrossOrigin(origins = "http://localhost:3000")
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//              .cors(cors -> cors.configurationSource(request -> {
//             CorsConfiguration config = new CorsConfiguration();
//             config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ Update your frontend URL
//             config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//             config.setAllowedHeaders(List.of("*"));
//             return config;
//         }))
//             .csrf(csrf -> csrf.disable()) // For API login from React
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/admin/login").permitAll()
//                 .requestMatchers("/all-stagedata").hasRole("ADMIN")
//                 .anyRequest().authenticated()
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/logout")
//                 .logoutSuccessUrl("/")
//                 .invalidateHttpSession(true)
//                 .deleteCookies("JSESSIONID")
//                 .permitAll()
//             )
//             .sessionManagement(session -> session
//                 .maximumSessions(1)
//                 .maxSessionsPreventsLogin(false)
//             )
//             .formLogin(form -> form.disable()); // ✅ Fully disable Spring's default login page


//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // Needed to allow manual authentication in AuthController
//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }
// // }
// package com.example.real_estate.api.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(request -> {
//                 CorsConfiguration config = new CorsConfiguration();
//                 config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ Allow frontend
//                 config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//                 config.setAllowedHeaders(List.of("*"));
//                 config.setAllowCredentials(true); // ✅ Allow cookies (for session authentication)
//                 return config;
//             }))
//             .csrf(csrf -> csrf.disable()) // ✅ Disable CSRF for APIs
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/", "/real-estatehome", "/properties", "/search").permitAll() // ✅ Public API access
//                 .requestMatchers("/api/entities/**").permitAll() // ✅ Allow all entity-related APIs
//                 .requestMatchers("/admin/searchByNameAndCity").permitAll()
//                 .requestMatchers("/admin/{id}").permitAll() // This won't work as-is due to path variable
//                 .requestMatchers("/admin/login").permitAll() // ✅ Allow login without authentication
//                 .requestMatchers("/uploads/**").permitAll() // ✅ Allow public access to images
//                 .requestMatchers("/admin/**", "/all-stagedata").hasRole("ADMIN") // ✅ Secure admin endpoints
//                 .requestMatchers("/api/consultations/**").permitAll()
//                 .requestMatchers("/uploads/**").permitAll() 
//                 .requestMatchers("/**/*.png", "/**/*.jpg", "/**/*.jpeg").permitAll() // ✅ Allow image access
                
//             )
//             .logout(logout -> logout
//                 .logoutUrl("/logout")
//                 .logoutSuccessUrl("/")
//                 .invalidateHttpSession(true)
//                 .deleteCookies("JSESSIONID")
//                 .permitAll()
//             )
//             .sessionManagement(session -> session
//                 .maximumSessions(1)
//                 .maxSessionsPreventsLogin(false)
//             )
//             .formLogin(form -> form.disable()); // ✅ Fully disable Spring's default login page

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // ✅ Needed to allow manual authentication in AuthController
//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     // ✅ CORS Filter to prevent issues in React frontend
//     @Bean
//     public CorsFilter corsFilter() {
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ Allow React frontend
//         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//         config.setAllowedHeaders(List.of("*"));
//         config.setAllowCredentials(true);
//         source.registerCorsConfiguration("/**", config);
//         return new CorsFilter(source);
//     }
// }
package com.example.real_estate.api.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of("http://localhost:3000")); // Allow frontend
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true); // Allow cookies (for session authentication)
                return config;
            }))
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/real-estatehome", "/properties", "/search").permitAll() // Public API access
                .requestMatchers("/api/entities/**").permitAll() // Allow all entity-related APIs
                .requestMatchers("/api/trends").permitAll()
                .requestMatchers("/admin/searchByNameAndCity").permitAll()
                .requestMatchers("/admin/{id}").permitAll() // Allow access to project details
                .requestMatchers("/admin/login").permitAll() // Allow login without authentication
                .requestMatchers("/uploads/**").permitAll() // Allow public access to images
                .requestMatchers("/admin/**", "/all-stagedata").hasRole("ADMIN") // Secure admin endpoints
                // .requestMatchers("").permitAll()

                 // Secure PUT API for updating projects
                .requestMatchers("/api/consultations/**").permitAll()
                .requestMatchers("/uploads/**").permitAll() 
                .requestMatchers("/**/*.png", "/**/*.jpg", "/**/*.jpeg").permitAll() // Allow image access
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .sessionManagement(session -> session
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false)
            )
            .formLogin(form -> form.disable()); // Fully disable Spring's default login page

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Needed to allow manual authentication in AuthController
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // CORS Filter to prevent issues in React frontend
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // Allow React frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}