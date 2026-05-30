package com.employee.config;

import com.employee.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration.
 *
 * Route rules:
 *   /api/auth/**        → public (login / register)
 *   GET /api/employees/** → USER + ADMIN
 *   POST/PUT/DELETE /api/employees/** → ADMIN only
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                // Public auth endpoints
                .requestMatchers("/api/auth/**").permitAll()
                // Read access for both USER and ADMIN
                .requestMatchers(
                    org.springframework.http.HttpMethod.GET,
                    "/api/employees/**"
                ).hasAnyRole("USER", "ADMIN")
                // Write access ADMIN only
                .requestMatchers(
                    org.springframework.http.HttpMethod.POST,
                    "/api/employees/**"
                ).hasRole("ADMIN")
                .requestMatchers(
                    org.springframework.http.HttpMethod.PUT,
                    "/api/employees/**"
                ).hasRole("ADMIN")
                .requestMatchers(
                    org.springframework.http.HttpMethod.DELETE,
                    "/api/employees/**"
                ).hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(s -> s
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
