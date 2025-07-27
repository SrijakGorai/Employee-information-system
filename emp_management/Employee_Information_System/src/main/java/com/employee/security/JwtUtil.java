package com.employee.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // At least 32 characters for HS256
    private static final String SECRET_KEY = "";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private static Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    
    public static String generateToken(String username, String role) {
        try {
            return Jwts.builder()
                    .setSubject(username)
                    .claim("role", role)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JWT Token generation failed: " + e.getMessage());
        }
    }

    
    public static Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extract username from a token.
     */
    public static String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Extract role from a token.
     */
    public static String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    /**
     * Validate token expiration and username.
     */
    public static boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    /**
     * Check if token is expired.
     */
    private static boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
