package com.example.real_estate.api.dto;

import java.util.Date;
import lombok.*;

@Getter
@Setter
public class AdminSearchDTO {
    private Integer projectId;
    private String orgName;
    private String projectName;
    private String city;
    private String locality;
    private Date createdAt;
    

    public AdminSearchDTO(Integer id, String orgName,String projectName,String city,String locality,Date createdAt) {
        this.projectId = id;
        this.orgName = orgName;
        this.projectName = projectName;
        this.city = city;       
        this.locality = locality;
        this.createdAt = createdAt;

    }

  
   
}
