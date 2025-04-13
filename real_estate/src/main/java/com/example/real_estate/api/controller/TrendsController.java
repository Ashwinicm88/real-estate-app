package com.example.real_estate.api.controller;

import com.example.real_estate.api.model.Trends;
import com.example.real_estate.api.service.TrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trends")
@CrossOrigin(origins = "*") // Optional: for frontend access
public class TrendsController {

    @Autowired
    private TrendService trendService;

    // ✅ GET all trends
    @GetMapping
    public List<Trends> getAllTrends() {
        return trendService.getAllTrends();
    }

    // ✅ POST new trend
    @PostMapping
    public Trends saveTrend(@RequestBody Trends trend) {
        return trendService.saveTrend(trend);
    }
}
