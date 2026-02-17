package com.wising.backend.modules.apiIntegration;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/integrations")
@RequiredArgsConstructor
public class ApiIntegrationController {

    private final ApiIntegrationService apiIntegrationService;

    @PostMapping("/fetch")
    public ResponseEntity<Map<String, Object>> fetchData(@RequestParam String url) {
        return ResponseEntity.ok(apiIntegrationService.fetchDataFromExternalApi(url));
    }
}
