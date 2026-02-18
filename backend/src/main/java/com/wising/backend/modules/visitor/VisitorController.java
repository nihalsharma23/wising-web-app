package com.wising.backend.modules.visitor;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow all origins for development
public class VisitorController {

    private final VisitorService visitorService;

    @GetMapping
    public long getVisitorCount() {
        return visitorService.getVisitorCount();
    }

    @PostMapping
    public long incrementVisitorCount() {
        return visitorService.incrementVisitorCount();
    }
}
