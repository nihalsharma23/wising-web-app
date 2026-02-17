package com.wising.backend.modules.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<List<AnalyticsData>> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAllAnalytics());
    }

    @PostMapping
    public ResponseEntity<AnalyticsData> recordMetric(@RequestParam String name, @RequestParam Double value) {
        return ResponseEntity.ok(analyticsService.recordMetric(name, value));
    }
}
