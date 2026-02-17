package com.wising.backend.modules.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;

    public List<AnalyticsData> getAllAnalytics() {
        return analyticsRepository.findAll();
    }

    public AnalyticsData recordMetric(String name, Double value) {
        AnalyticsData data = AnalyticsData.builder()
                .metricName(name)
                .value(value)
                .build();
        return analyticsRepository.save(data);
    }
}
