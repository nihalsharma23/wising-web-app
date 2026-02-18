package com.wising.backend.modules.visitor;

import org.springframework.stereotype.Service;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class VisitorService {

    private final AtomicLong visitorCount = new AtomicLong(0);

    public long getVisitorCount() {
        return visitorCount.get();
    }

    public long incrementVisitorCount() {
        return visitorCount.incrementAndGet();
    }
}
