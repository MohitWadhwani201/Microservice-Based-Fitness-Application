package com.fitness.userservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.jspecify.annotations.Nullable;

@Data
public class RegisterRequest {
    @NotBlank(message = "email is required")
    @Email(message = " Invalid Email Format ")
    private String email;
    @NotBlank(message = "password is required")
    @Size(min = 6 , message = " Password must have atleast 6 characters")
    private String password;
    @NotBlank(message = "First Name is required")
    private String firstName;
    @NotBlank(message = "Last Name is required")
    private String lastName;
    private String keyCloakId;
}
