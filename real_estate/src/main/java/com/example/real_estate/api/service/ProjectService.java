package com.example.real_estate.api.service;

import com.example.real_estate.api.dto.AdminUpdateDTO;

public interface ProjectService {
    void updateProjectById(Integer projectId, AdminUpdateDTO request);
}
