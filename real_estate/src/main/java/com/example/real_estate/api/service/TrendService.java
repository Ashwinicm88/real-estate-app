package com.example.real_estate.api.service;

import com.example.real_estate.api.model.Trends;
import com.example.real_estate.api.repository.TrendsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrendService {

    @Autowired
    private TrendsRepository trendRepository;

    public List<Trends> getAllTrends() {
        return trendRepository.findAll();
    }

    public Trends saveTrend(Trends trend) {
        return trendRepository.save(trend);
    }
}
