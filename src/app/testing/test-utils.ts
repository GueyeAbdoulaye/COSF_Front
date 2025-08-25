import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

/**
 * Common imports needed for most component tests
 */
export const COMMON_TEST_IMPORTS = [
  HttpClientTestingModule,
  RouterTestingModule,
  NoopAnimationsModule
];

/**
 * Mock ActivatedRoute provider
 */
export const MOCK_ACTIVATED_ROUTE = {
  provide: ActivatedRoute,
  useValue: {
    params: of({}),
    queryParams: of({}),
    snapshot: {
      params: {},
      queryParams: {},
      paramMap: {
        get: () => null
      }
    }
  }
};

/**
 * Google Maps mock for testing
 */
export function setupGoogleMapsMock() {
  // Mock the global google object
  (window as any).google = {
    maps: {
      Map: class MockMap {
        constructor(element: any, options: any) {}
      },
      LatLng: class MockLatLng {
        constructor(lat: number, lng: number) {}
      },
      Marker: class MockMarker {
        constructor(options: any) {}
      },
      InfoWindow: class MockInfoWindow {
        constructor(options?: any) {}
        open() {}
        close() {}
      },
      event: {
        addListener: () => {},
        removeListener: () => {}
      }
    }
  };
}
