import "./chunk-QZDBAPOE.js";
import {
  isPlatformBrowser
} from "./chunk-2KQIXSBZ.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  PLATFORM_ID,
  Subject,
  Subscription,
  ViewEncapsulation,
  __async,
  __spreadProps,
  __spreadValues,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  switchMap,
  take,
  takeUntil,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-TLFJCAK2.js";

// node_modules/@angular/google-maps/fesm2022/google-maps.mjs
var _c0 = ["*"];
var MapEventManager = class {
  _ngZone;
  /** Pending listeners that were added before the target was set. */
  _pending = [];
  _listeners = [];
  _targetStream = new BehaviorSubject(void 0);
  /** Clears all currently-registered event listeners. */
  _clearListeners() {
    for (const listener of this._listeners) {
      listener.remove();
    }
    this._listeners = [];
  }
  constructor(_ngZone) {
    this._ngZone = _ngZone;
  }
  /** Gets an observable that adds an event listener to the map when a consumer subscribes to it. */
  getLazyEmitter(name) {
    return this._targetStream.pipe(switchMap((target) => {
      const observable = new Observable((observer) => {
        if (!target) {
          this._pending.push({
            observable,
            observer
          });
          return void 0;
        }
        const listener = target.addListener(name, (event) => {
          this._ngZone.run(() => observer.next(event));
        });
        if (!listener) {
          observer.complete();
          return void 0;
        }
        this._listeners.push(listener);
        return () => listener.remove();
      });
      return observable;
    }));
  }
  /** Sets the current target that the manager should bind events to. */
  setTarget(target) {
    const currentTarget = this._targetStream.value;
    if (target === currentTarget) {
      return;
    }
    if (currentTarget) {
      this._clearListeners();
      this._pending = [];
    }
    this._targetStream.next(target);
    this._pending.forEach((subscriber) => subscriber.observable.subscribe(subscriber.observer));
    this._pending = [];
  }
  /** Destroys the manager and clears the event listeners. */
  destroy() {
    this._clearListeners();
    this._pending = [];
    this._targetStream.complete();
  }
};
var DEFAULT_OPTIONS = {
  center: {
    lat: 37.421995,
    lng: -122.084092
  },
  zoom: 17,
  // Note: the type conversion here isn't necessary for our CI, but it resolves a g3 failure.
  mapTypeId: "roadmap"
};
var DEFAULT_HEIGHT = "500px";
var DEFAULT_WIDTH = "500px";
var GoogleMap = class _GoogleMap {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _mapEl;
  _existingAuthFailureCallback;
  /**
   * The underlying google.maps.Map object
   *
   * See developers.google.com/maps/documentation/javascript/reference/map#Map
   */
  googleMap;
  /** Whether we're currently rendering inside a browser. */
  _isBrowser;
  /** Height of the map. Set this to `null` if you'd like to control the height through CSS. */
  height = DEFAULT_HEIGHT;
  /** Width of the map. Set this to `null` if you'd like to control the width through CSS. */
  width = DEFAULT_WIDTH;
  /**
   * The Map ID of the map. This parameter cannot be set or changed after a map is instantiated.
   * See: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapId
   */
  mapId;
  /**
   * Type of map that should be rendered. E.g. hybrid map, terrain map etc.
   * See: https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeId
   */
  mapTypeId;
  set center(center) {
    this._center = center;
  }
  _center;
  set zoom(zoom) {
    this._zoom = zoom;
  }
  _zoom;
  set options(options) {
    this._options = options || DEFAULT_OPTIONS;
  }
  _options = DEFAULT_OPTIONS;
  /** Event emitted when the map is initialized. */
  mapInitialized = new EventEmitter();
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/events#auth-errors
   */
  authFailure = new EventEmitter();
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.bounds_changed
   */
  boundsChanged = this._eventManager.getLazyEmitter("bounds_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.center_changed
   */
  centerChanged = this._eventManager.getLazyEmitter("center_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.click
   */
  mapClick = this._eventManager.getLazyEmitter("click");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.dblclick
   */
  mapDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.drag
   */
  mapDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.dragend
   */
  mapDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.dragstart
   */
  mapDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.heading_changed
   */
  headingChanged = this._eventManager.getLazyEmitter("heading_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.idle
   */
  idle = this._eventManager.getLazyEmitter("idle");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.maptypeid_changed
   */
  maptypeidChanged = this._eventManager.getLazyEmitter("maptypeid_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.mousemove
   */
  mapMousemove = this._eventManager.getLazyEmitter("mousemove");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.mouseout
   */
  mapMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.mouseover
   */
  mapMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/map#Map.projection_changed
   */
  projectionChanged = this._eventManager.getLazyEmitter("projection_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.rightclick
   */
  mapRightclick = this._eventManager.getLazyEmitter("rightclick");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.tilesloaded
   */
  tilesloaded = this._eventManager.getLazyEmitter("tilesloaded");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.tilt_changed
   */
  tiltChanged = this._eventManager.getLazyEmitter("tilt_changed");
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.zoom_changed
   */
  zoomChanged = this._eventManager.getLazyEmitter("zoom_changed");
  constructor() {
    const platformId = inject(PLATFORM_ID);
    this._isBrowser = isPlatformBrowser(platformId);
    if (this._isBrowser) {
      const googleMapsWindow = window;
      if (!googleMapsWindow.google && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Namespace google not found, cannot construct embedded google map. Please install the Google Maps JavaScript API: https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API");
      }
      this._existingAuthFailureCallback = googleMapsWindow.gm_authFailure;
      googleMapsWindow.gm_authFailure = () => {
        if (this._existingAuthFailureCallback) {
          this._existingAuthFailureCallback();
        }
        this.authFailure.emit();
      };
    }
  }
  ngOnChanges(changes) {
    if (changes["height"] || changes["width"]) {
      this._setSize();
    }
    const googleMap = this.googleMap;
    if (googleMap) {
      if (changes["options"]) {
        googleMap.setOptions(this._combineOptions());
      }
      if (changes["center"] && this._center) {
        googleMap.setCenter(this._center);
      }
      if (changes["zoom"] && this._zoom != null) {
        googleMap.setZoom(this._zoom);
      }
      if (changes["mapTypeId"] && this.mapTypeId) {
        googleMap.setMapTypeId(this.mapTypeId);
      }
    }
  }
  ngOnInit() {
    if (this._isBrowser) {
      this._mapEl = this._elementRef.nativeElement.querySelector(".map-container");
      this._setSize();
      if (google.maps.Map) {
        this._initialize(google.maps.Map);
      } else {
        this._ngZone.runOutsideAngular(() => {
          google.maps.importLibrary("maps").then((lib) => this._initialize(lib.Map));
        });
      }
    }
  }
  _initialize(mapConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.googleMap = new mapConstructor(this._mapEl, this._combineOptions());
      this._eventManager.setTarget(this.googleMap);
      this.mapInitialized.emit(this.googleMap);
    });
  }
  ngOnDestroy() {
    this.mapInitialized.complete();
    this._eventManager.destroy();
    if (this._isBrowser) {
      const googleMapsWindow = window;
      googleMapsWindow.gm_authFailure = this._existingAuthFailureCallback;
    }
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds
   */
  fitBounds(bounds, padding) {
    this._assertInitialized();
    this.googleMap.fitBounds(bounds, padding);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panBy
   */
  panBy(x, y) {
    this._assertInitialized();
    this.googleMap.panBy(x, y);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panTo
   */
  panTo(latLng) {
    this._assertInitialized();
    this.googleMap.panTo(latLng);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.panToBounds
   */
  panToBounds(latLngBounds, padding) {
    this._assertInitialized();
    this.googleMap.panToBounds(latLngBounds, padding);
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.googleMap.getBounds() || null;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getCenter
   */
  getCenter() {
    this._assertInitialized();
    return this.googleMap.getCenter();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getClickableIcons
   */
  getClickableIcons() {
    this._assertInitialized();
    return this.googleMap.getClickableIcons();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getHeading
   */
  getHeading() {
    this._assertInitialized();
    return this.googleMap.getHeading();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getMapTypeId
   */
  getMapTypeId() {
    this._assertInitialized();
    return this.googleMap.getMapTypeId();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getProjection
   */
  getProjection() {
    this._assertInitialized();
    return this.googleMap.getProjection() || null;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getStreetView
   */
  getStreetView() {
    this._assertInitialized();
    return this.googleMap.getStreetView();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getTilt
   */
  getTilt() {
    this._assertInitialized();
    return this.googleMap.getTilt();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.getZoom
   */
  getZoom() {
    this._assertInitialized();
    return this.googleMap.getZoom();
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.controls
   */
  get controls() {
    this._assertInitialized();
    return this.googleMap.controls;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.data
   */
  get data() {
    this._assertInitialized();
    return this.googleMap.data;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.mapTypes
   */
  get mapTypes() {
    this._assertInitialized();
    return this.googleMap.mapTypes;
  }
  /**
   * See
   * https://developers.google.com/maps/documentation/javascript/reference/map#Map.overlayMapTypes
   */
  get overlayMapTypes() {
    this._assertInitialized();
    return this.googleMap.overlayMapTypes;
  }
  /** Returns a promise that resolves when the map has been initialized. */
  _resolveMap() {
    return this.googleMap ? Promise.resolve(this.googleMap) : this.mapInitialized.pipe(take(1)).toPromise();
  }
  _setSize() {
    if (this._mapEl) {
      const styles = this._mapEl.style;
      styles.height = this.height === null ? "" : coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = this.width === null ? "" : coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }
  /** Combines the center and zoom and the other map options into a single object */
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      // It's important that we set **some** kind of `center` and `zoom`, otherwise
      // Google Maps will render a blank rectangle which looks broken.
      center: this._center || options.center || DEFAULT_OPTIONS.center,
      zoom: this._zoom ?? options.zoom ?? DEFAULT_OPTIONS.zoom,
      // Passing in an undefined `mapTypeId` seems to break tile loading
      // so make sure that we have some kind of default (see #22082).
      mapTypeId: this.mapTypeId || options.mapTypeId || DEFAULT_OPTIONS.mapTypeId,
      mapId: this.mapId || options.mapId
    });
  }
  /** Asserts that the map has been initialized. */
  _assertInitialized() {
    if (!this.googleMap && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Cannot access Google Map information before the API has been initialized. Please wait for the API to load before trying to interact with it.");
    }
  }
  static ɵfac = function GoogleMap_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleMap)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GoogleMap,
    selectors: [["google-map"]],
    inputs: {
      height: "height",
      width: "width",
      mapId: "mapId",
      mapTypeId: "mapTypeId",
      center: "center",
      zoom: "zoom",
      options: "options"
    },
    outputs: {
      mapInitialized: "mapInitialized",
      authFailure: "authFailure",
      boundsChanged: "boundsChanged",
      centerChanged: "centerChanged",
      mapClick: "mapClick",
      mapDblclick: "mapDblclick",
      mapDrag: "mapDrag",
      mapDragend: "mapDragend",
      mapDragstart: "mapDragstart",
      headingChanged: "headingChanged",
      idle: "idle",
      maptypeidChanged: "maptypeidChanged",
      mapMousemove: "mapMousemove",
      mapMouseout: "mapMouseout",
      mapMouseover: "mapMouseover",
      projectionChanged: "projectionChanged",
      mapRightclick: "mapRightclick",
      tilesloaded: "tilesloaded",
      tiltChanged: "tiltChanged",
      zoomChanged: "zoomChanged"
    },
    exportAs: ["googleMap"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 0,
    consts: [[1, "map-container"]],
    template: function GoogleMap_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelement(0, "div", 0);
        ɵɵprojection(1);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleMap, [{
    type: Component,
    args: [{
      selector: "google-map",
      exportAs: "googleMap",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div class="map-container"></div><ng-content />',
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    height: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    mapId: [{
      type: Input
    }],
    mapTypeId: [{
      type: Input
    }],
    center: [{
      type: Input
    }],
    zoom: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    mapInitialized: [{
      type: Output
    }],
    authFailure: [{
      type: Output
    }],
    boundsChanged: [{
      type: Output
    }],
    centerChanged: [{
      type: Output
    }],
    mapClick: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    headingChanged: [{
      type: Output
    }],
    idle: [{
      type: Output
    }],
    maptypeidChanged: [{
      type: Output
    }],
    mapMousemove: [{
      type: Output
    }],
    mapMouseout: [{
      type: Output
    }],
    mapMouseover: [{
      type: Output
    }],
    projectionChanged: [{
      type: Output
    }],
    mapRightclick: [{
      type: Output
    }],
    tilesloaded: [{
      type: Output
    }],
    tiltChanged: [{
      type: Output
    }],
    zoomChanged: [{
      type: Output
    }]
  });
})();
var cssUnitsPattern = /([A-Za-z%]+)$/;
function coerceCssPixelValue(value) {
  if (value == null) {
    return "";
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
var MapBaseLayer = class _MapBaseLayer {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._ngZone.runOutsideAngular(() => {
        this._initializeObject();
      });
      this._assertInitialized();
      this._setMap();
    }
  }
  ngOnDestroy() {
    this._unsetMap();
  }
  _assertInitialized() {
    if (!this._map.googleMap) {
      throw Error("Cannot access Google Map information before the API has been initialized. Please wait for the API to load before trying to interact with it.");
    }
  }
  _initializeObject() {
  }
  _setMap() {
  }
  _unsetMap() {
  }
  static ɵfac = function MapBaseLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapBaseLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapBaseLayer,
    selectors: [["map-base-layer"]],
    exportAs: ["mapBaseLayer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapBaseLayer, [{
    type: Directive,
    args: [{
      selector: "map-base-layer",
      exportAs: "mapBaseLayer"
    }]
  }], () => [], null);
})();
var MapBicyclingLayer = class _MapBicyclingLayer {
  _map = inject(GoogleMap);
  _zone = inject(NgZone);
  /**
   * The underlying google.maps.BicyclingLayer object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/map#BicyclingLayer
   */
  bicyclingLayer;
  /** Event emitted when the bicycling layer is initialized. */
  bicyclingLayerInitialized = new EventEmitter();
  ngOnInit() {
    if (this._map._isBrowser) {
      if (google.maps.BicyclingLayer && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.BicyclingLayer);
      } else {
        this._zone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.BicyclingLayer);
          });
        });
      }
    }
  }
  _initialize(map2, layerConstructor) {
    this._zone.runOutsideAngular(() => {
      this.bicyclingLayer = new layerConstructor();
      this.bicyclingLayerInitialized.emit(this.bicyclingLayer);
      this._assertLayerInitialized();
      this.bicyclingLayer.setMap(map2);
    });
  }
  ngOnDestroy() {
    this.bicyclingLayer?.setMap(null);
  }
  _assertLayerInitialized() {
    if (!this.bicyclingLayer) {
      throw Error("Cannot interact with a Google Map Bicycling Layer before it has been initialized. Please wait for the Transit Layer to load before trying to interact with it.");
    }
  }
  static ɵfac = function MapBicyclingLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapBicyclingLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapBicyclingLayer,
    selectors: [["map-bicycling-layer"]],
    outputs: {
      bicyclingLayerInitialized: "bicyclingLayerInitialized"
    },
    exportAs: ["mapBicyclingLayer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapBicyclingLayer, [{
    type: Directive,
    args: [{
      selector: "map-bicycling-layer",
      exportAs: "mapBicyclingLayer"
    }]
  }], null, {
    bicyclingLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapCircle = class _MapCircle {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _center = new BehaviorSubject(void 0);
  _radius = new BehaviorSubject(void 0);
  _destroyed = new Subject();
  /**
   * Underlying google.maps.Circle object.
   *
   * @see developers.google.com/maps/documentation/javascript/reference/polygon#Circle
   */
  circle;
  // initialized in ngOnInit
  set options(options) {
    this._options.next(options || {});
  }
  set center(center) {
    this._center.next(center);
  }
  set radius(radius) {
    this._radius.next(radius);
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.center_changed
   */
  centerChanged = this._eventManager.getLazyEmitter("center_changed");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.click
   */
  circleClick = this._eventManager.getLazyEmitter("click");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.dblclick
   */
  circleDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.drag
   */
  circleDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.dragend
   */
  circleDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.dragstart
   */
  circleDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.mousedown
   */
  circleMousedown = this._eventManager.getLazyEmitter("mousedown");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.mousemove
   */
  circleMousemove = this._eventManager.getLazyEmitter("mousemove");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.mouseout
   */
  circleMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.mouseover
   */
  circleMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.mouseup
   */
  circleMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.radius_changed
   */
  radiusChanged = this._eventManager.getLazyEmitter("radius_changed");
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.rightclick
   */
  circleRightclick = this._eventManager.getLazyEmitter("rightclick");
  /** Event emitted when the circle is initialized. */
  circleInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (!this._map._isBrowser) {
      return;
    }
    this._combineOptions().pipe(take(1)).subscribe((options) => {
      if (google.maps.Circle && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.Circle, options);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.Circle, options);
          });
        });
      }
    });
  }
  _initialize(map2, circleConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.circle = new circleConstructor(options);
      this._assertInitialized();
      this.circle.setMap(map2);
      this._eventManager.setTarget(this.circle);
      this.circleInitialized.emit(this.circle);
      this._watchForOptionsChanges();
      this._watchForCenterChanges();
      this._watchForRadiusChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.circle?.setMap(null);
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.circle.getBounds();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getCenter
   */
  getCenter() {
    this._assertInitialized();
    return this.circle.getCenter();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.circle.getDraggable();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.circle.getEditable();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getRadius
   */
  getRadius() {
    this._assertInitialized();
    return this.circle.getRadius();
  }
  /**
   * @see
   * developers.google.com/maps/documentation/javascript/reference/polygon#Circle.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.circle.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._center, this._radius]).pipe(map(([options, center, radius]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        center: center || options.center,
        radius: radius !== void 0 ? radius : options.radius
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.circle.setOptions(options);
    });
  }
  _watchForCenterChanges() {
    this._center.pipe(takeUntil(this._destroyed)).subscribe((center) => {
      if (center) {
        this._assertInitialized();
        this.circle.setCenter(center);
      }
    });
  }
  _watchForRadiusChanges() {
    this._radius.pipe(takeUntil(this._destroyed)).subscribe((radius) => {
      if (radius !== void 0) {
        this._assertInitialized();
        this.circle.setRadius(radius);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.circle) {
        throw Error("Cannot interact with a Google Map Circle before it has been initialized. Please wait for the Circle to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapCircle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapCircle)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapCircle,
    selectors: [["map-circle"]],
    inputs: {
      options: "options",
      center: "center",
      radius: "radius"
    },
    outputs: {
      centerChanged: "centerChanged",
      circleClick: "circleClick",
      circleDblclick: "circleDblclick",
      circleDrag: "circleDrag",
      circleDragend: "circleDragend",
      circleDragstart: "circleDragstart",
      circleMousedown: "circleMousedown",
      circleMousemove: "circleMousemove",
      circleMouseout: "circleMouseout",
      circleMouseover: "circleMouseover",
      circleMouseup: "circleMouseup",
      radiusChanged: "radiusChanged",
      circleRightclick: "circleRightclick",
      circleInitialized: "circleInitialized"
    },
    exportAs: ["mapCircle"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapCircle, [{
    type: Directive,
    args: [{
      selector: "map-circle",
      exportAs: "mapCircle"
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    center: [{
      type: Input
    }],
    radius: [{
      type: Input
    }],
    centerChanged: [{
      type: Output
    }],
    circleClick: [{
      type: Output
    }],
    circleDblclick: [{
      type: Output
    }],
    circleDrag: [{
      type: Output
    }],
    circleDragend: [{
      type: Output
    }],
    circleDragstart: [{
      type: Output
    }],
    circleMousedown: [{
      type: Output
    }],
    circleMousemove: [{
      type: Output
    }],
    circleMouseout: [{
      type: Output
    }],
    circleMouseover: [{
      type: Output
    }],
    circleMouseup: [{
      type: Output
    }],
    radiusChanged: [{
      type: Output
    }],
    circleRightclick: [{
      type: Output
    }],
    circleInitialized: [{
      type: Output
    }]
  });
})();
var MapDirectionsRenderer = class _MapDirectionsRenderer {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRendererOptions.directions
   */
  set directions(directions) {
    this._directions = directions;
  }
  _directions;
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRendererOptions
   */
  set options(options) {
    this._options = options;
  }
  _options;
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.directions_changed
   */
  directionsChanged = this._eventManager.getLazyEmitter("directions_changed");
  /** Event emitted when the directions renderer is initialized. */
  directionsRendererInitialized = new EventEmitter();
  /** The underlying google.maps.DirectionsRenderer object. */
  directionsRenderer;
  constructor() {
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      if (google.maps.DirectionsRenderer && this._googleMap.googleMap) {
        this._initialize(this._googleMap.googleMap, google.maps.DirectionsRenderer);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("routes")]).then(([map2, lib]) => {
            this._initialize(map2, lib.DirectionsRenderer);
          });
        });
      }
    }
  }
  _initialize(map2, rendererConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.directionsRenderer = new rendererConstructor(this._combineOptions());
      this._assertInitialized();
      this.directionsRenderer.setMap(map2);
      this._eventManager.setTarget(this.directionsRenderer);
      this.directionsRendererInitialized.emit(this.directionsRenderer);
    });
  }
  ngOnChanges(changes) {
    if (this.directionsRenderer) {
      if (changes["options"]) {
        this.directionsRenderer.setOptions(this._combineOptions());
      }
      if (changes["directions"] && this._directions !== void 0) {
        this.directionsRenderer.setDirections(this._directions);
      }
    }
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this.directionsRenderer?.setMap(null);
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getDirections
   */
  getDirections() {
    this._assertInitialized();
    return this.directionsRenderer.getDirections();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getPanel
   */
  getPanel() {
    this._assertInitialized();
    return this.directionsRenderer.getPanel();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsRenderer.getRouteIndex
   */
  getRouteIndex() {
    this._assertInitialized();
    return this.directionsRenderer.getRouteIndex();
  }
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      directions: this._directions || options.directions,
      map: this._googleMap.googleMap
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.directionsRenderer) {
        throw Error("Cannot interact with a Google Map Directions Renderer before it has been initialized. Please wait for the Directions Renderer to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapDirectionsRenderer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapDirectionsRenderer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapDirectionsRenderer,
    selectors: [["map-directions-renderer"]],
    inputs: {
      directions: "directions",
      options: "options"
    },
    outputs: {
      directionsChanged: "directionsChanged",
      directionsRendererInitialized: "directionsRendererInitialized"
    },
    exportAs: ["mapDirectionsRenderer"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapDirectionsRenderer, [{
    type: Directive,
    args: [{
      selector: "map-directions-renderer",
      exportAs: "mapDirectionsRenderer"
    }]
  }], () => [], {
    directions: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    directionsChanged: [{
      type: Output
    }],
    directionsRendererInitialized: [{
      type: Output
    }]
  });
})();
var MapGroundOverlay = class _MapGroundOverlay {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _opacity = new BehaviorSubject(1);
  _url = new BehaviorSubject("");
  _bounds = new BehaviorSubject(void 0);
  _destroyed = new Subject();
  _hasWatchers;
  /**
   * The underlying google.maps.GroundOverlay object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay
   */
  groundOverlay;
  /** URL of the image that will be shown in the overlay. */
  set url(url) {
    this._url.next(url);
  }
  /** Bounds for the overlay. */
  get bounds() {
    return this._bounds.value;
  }
  set bounds(bounds) {
    this._bounds.next(bounds);
  }
  /** Whether the overlay is clickable */
  clickable = false;
  /** Opacity of the overlay. */
  set opacity(opacity) {
    this._opacity.next(opacity);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay.click
   */
  mapClick = this._eventManager.getLazyEmitter("click");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.dblclick
   */
  mapDblclick = this._eventManager.getLazyEmitter("dblclick");
  /** Event emitted when the ground overlay is initialized. */
  groundOverlayInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._bounds.pipe(takeUntil(this._destroyed)).subscribe((bounds) => {
        if (this.groundOverlay) {
          this.groundOverlay.setMap(null);
          this.groundOverlay = void 0;
        }
        if (!bounds) {
          return;
        }
        if (google.maps.GroundOverlay && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.GroundOverlay, bounds);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.GroundOverlay, bounds);
            });
          });
        }
      });
    }
  }
  _initialize(map2, overlayConstructor, bounds) {
    this._ngZone.runOutsideAngular(() => {
      this.groundOverlay = new overlayConstructor(this._url.getValue(), bounds, {
        clickable: this.clickable,
        opacity: this._opacity.value
      });
      this._assertInitialized();
      this.groundOverlay.setMap(map2);
      this._eventManager.setTarget(this.groundOverlay);
      this.groundOverlayInitialized.emit(this.groundOverlay);
      if (!this._hasWatchers) {
        this._hasWatchers = true;
        this._watchForOpacityChanges();
        this._watchForUrlChanges();
      }
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.groundOverlay?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.groundOverlay.getBounds();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getOpacity
   */
  getOpacity() {
    this._assertInitialized();
    return this.groundOverlay.getOpacity();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/image-overlay
   * #GroundOverlay.getUrl
   */
  getUrl() {
    this._assertInitialized();
    return this.groundOverlay.getUrl();
  }
  _watchForOpacityChanges() {
    this._opacity.pipe(takeUntil(this._destroyed)).subscribe((opacity) => {
      if (opacity != null) {
        this.groundOverlay?.setOpacity(opacity);
      }
    });
  }
  _watchForUrlChanges() {
    this._url.pipe(takeUntil(this._destroyed)).subscribe((url) => {
      const overlay = this.groundOverlay;
      if (overlay) {
        overlay.set("url", url);
        overlay.setMap(null);
        overlay.setMap(this._map.googleMap);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.groundOverlay) {
        throw Error("Cannot interact with a Google Map GroundOverlay before it has been initialized. Please wait for the GroundOverlay to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapGroundOverlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapGroundOverlay)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapGroundOverlay,
    selectors: [["map-ground-overlay"]],
    inputs: {
      url: "url",
      bounds: "bounds",
      clickable: "clickable",
      opacity: "opacity"
    },
    outputs: {
      mapClick: "mapClick",
      mapDblclick: "mapDblclick",
      groundOverlayInitialized: "groundOverlayInitialized"
    },
    exportAs: ["mapGroundOverlay"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapGroundOverlay, [{
    type: Directive,
    args: [{
      selector: "map-ground-overlay",
      exportAs: "mapGroundOverlay"
    }]
  }], () => [], {
    url: [{
      type: Input
    }],
    bounds: [{
      type: Input
    }],
    clickable: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    mapClick: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    groundOverlayInitialized: [{
      type: Output
    }]
  });
})();
var MapInfoWindow = class _MapInfoWindow {
  _googleMap = inject(GoogleMap);
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _position = new BehaviorSubject(void 0);
  _destroy = new Subject();
  /**
   * Underlying google.maps.InfoWindow
   *
   * See developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow
   */
  infoWindow;
  set options(options) {
    this._options.next(options || {});
  }
  set position(position) {
    this._position.next(position);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.closeclick
   */
  closeclick = this._eventManager.getLazyEmitter("closeclick");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window
   * #InfoWindow.content_changed
   */
  contentChanged = this._eventManager.getLazyEmitter("content_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.domready
   */
  domready = this._eventManager.getLazyEmitter("domready");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window
   * #InfoWindow.position_changed
   */
  positionChanged = this._eventManager.getLazyEmitter("position_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window
   * #InfoWindow.zindex_changed
   */
  zindexChanged = this._eventManager.getLazyEmitter("zindex_changed");
  /** Event emitted when the info window is initialized. */
  infoWindowInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.InfoWindow) {
          this._initialize(google.maps.InfoWindow, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            google.maps.importLibrary("maps").then((lib) => {
              this._initialize(lib.InfoWindow, options);
            });
          });
        }
      });
    }
  }
  _initialize(infoWindowConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.infoWindow = new infoWindowConstructor(options);
      this._eventManager.setTarget(this.infoWindow);
      this.infoWindowInitialized.emit(this.infoWindow);
      this._watchForOptionsChanges();
      this._watchForPositionChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroy.next();
    this._destroy.complete();
    if (this.infoWindow) {
      this.close();
    }
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.close
   */
  close() {
    this._assertInitialized();
    this.infoWindow.close();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.getContent
   */
  getContent() {
    this._assertInitialized();
    return this.infoWindow.getContent() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window
   * #InfoWindow.getPosition
   */
  getPosition() {
    this._assertInitialized();
    return this.infoWindow.getPosition() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.infoWindow.getZIndex();
  }
  /**
   * Opens the MapInfoWindow using the provided AdvancedMarkerElement.
   * @deprecated Use the `open` method instead.
   * @breaking-change 20.0.0
   */
  openAdvancedMarkerElement(advancedMarkerElement, content) {
    this.open({
      getAnchor: () => advancedMarkerElement
    }, void 0, content);
  }
  /**
   * Opens the MapInfoWindow using the provided anchor. If the anchor is not set,
   * then the position property of the options input is used instead.
   */
  open(anchor, shouldFocus, content) {
    this._assertInitialized();
    if ((typeof ngDevMode === "undefined" || ngDevMode) && anchor && !anchor.getAnchor) {
      throw new Error("Specified anchor does not implement the `getAnchor` method. It cannot be used to open an info window.");
    }
    const anchorObject = anchor ? anchor.getAnchor() : void 0;
    if (this.infoWindow.get("anchor") !== anchorObject || !anchorObject) {
      this._elementRef.nativeElement.style.display = content ? "none" : "";
      if (content) {
        this.infoWindow.setContent(content);
      }
      this.infoWindow.open({
        map: this._googleMap.googleMap,
        anchor: anchorObject,
        shouldFocus
      });
    }
  }
  _combineOptions() {
    return combineLatest([this._options, this._position]).pipe(map(([options, position]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        position: position || options.position,
        content: this._elementRef.nativeElement
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroy)).subscribe((options) => {
      this._assertInitialized();
      this.infoWindow.setOptions(options);
    });
  }
  _watchForPositionChanges() {
    this._position.pipe(takeUntil(this._destroy)).subscribe((position) => {
      if (position) {
        this._assertInitialized();
        this.infoWindow.setPosition(position);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.infoWindow) {
        throw Error("Cannot interact with a Google Map Info Window before it has been initialized. Please wait for the Info Window to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapInfoWindow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapInfoWindow)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapInfoWindow,
    selectors: [["map-info-window"]],
    hostAttrs: [2, "display", "none"],
    inputs: {
      options: "options",
      position: "position"
    },
    outputs: {
      closeclick: "closeclick",
      contentChanged: "contentChanged",
      domready: "domready",
      positionChanged: "positionChanged",
      zindexChanged: "zindexChanged",
      infoWindowInitialized: "infoWindowInitialized"
    },
    exportAs: ["mapInfoWindow"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapInfoWindow, [{
    type: Directive,
    args: [{
      selector: "map-info-window",
      exportAs: "mapInfoWindow",
      host: {
        "style": "display: none"
      }
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    closeclick: [{
      type: Output
    }],
    contentChanged: [{
      type: Output
    }],
    domready: [{
      type: Output
    }],
    positionChanged: [{
      type: Output
    }],
    zindexChanged: [{
      type: Output
    }],
    infoWindowInitialized: [{
      type: Output
    }]
  });
})();
var MapKmlLayer = class _MapKmlLayer {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _url = new BehaviorSubject("");
  _destroyed = new Subject();
  /**
   * The underlying google.maps.KmlLayer object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer
   */
  kmlLayer;
  set options(options) {
    this._options.next(options || {});
  }
  set url(url) {
    this._url.next(url);
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.click
   */
  kmlClick = this._eventManager.getLazyEmitter("click");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/kml
   * #KmlLayer.defaultviewport_changed
   */
  defaultviewportChanged = this._eventManager.getLazyEmitter("defaultviewport_changed");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.status_changed
   */
  statusChanged = this._eventManager.getLazyEmitter("status_changed");
  /** Event emitted when the KML layer is initialized. */
  kmlLayerInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.KmlLayer && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.KmlLayer, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.KmlLayer, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, layerConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.kmlLayer = new layerConstructor(options);
      this._assertInitialized();
      this.kmlLayer.setMap(map2);
      this._eventManager.setTarget(this.kmlLayer);
      this.kmlLayerInitialized.emit(this.kmlLayer);
      this._watchForOptionsChanges();
      this._watchForUrlChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.kmlLayer?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getDefaultViewport
   */
  getDefaultViewport() {
    this._assertInitialized();
    return this.kmlLayer.getDefaultViewport();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getMetadata
   */
  getMetadata() {
    this._assertInitialized();
    return this.kmlLayer.getMetadata();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getStatus
   */
  getStatus() {
    this._assertInitialized();
    return this.kmlLayer.getStatus();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getUrl
   */
  getUrl() {
    this._assertInitialized();
    return this.kmlLayer.getUrl();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.kmlLayer.getZIndex();
  }
  _combineOptions() {
    return combineLatest([this._options, this._url]).pipe(map(([options, url]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        url: url || options.url
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      if (this.kmlLayer) {
        this._assertInitialized();
        this.kmlLayer.setOptions(options);
      }
    });
  }
  _watchForUrlChanges() {
    this._url.pipe(takeUntil(this._destroyed)).subscribe((url) => {
      if (url && this.kmlLayer) {
        this._assertInitialized();
        this.kmlLayer.setUrl(url);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.kmlLayer) {
        throw Error("Cannot interact with a Google Map KmlLayer before it has been initialized. Please wait for the KmlLayer to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapKmlLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapKmlLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapKmlLayer,
    selectors: [["map-kml-layer"]],
    inputs: {
      options: "options",
      url: "url"
    },
    outputs: {
      kmlClick: "kmlClick",
      defaultviewportChanged: "defaultviewportChanged",
      statusChanged: "statusChanged",
      kmlLayerInitialized: "kmlLayerInitialized"
    },
    exportAs: ["mapKmlLayer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapKmlLayer, [{
    type: Directive,
    args: [{
      selector: "map-kml-layer",
      exportAs: "mapKmlLayer"
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    kmlClick: [{
      type: Output
    }],
    defaultviewportChanged: [{
      type: Output
    }],
    statusChanged: [{
      type: Output
    }],
    kmlLayerInitialized: [{
      type: Output
    }]
  });
})();
var MAP_MARKER = new InjectionToken("MAP_MARKER");
var DEFAULT_MARKER_OPTIONS$1 = {
  position: {
    lat: 37.421995,
    lng: -122.084092
  }
};
var MapMarker = class _MapMarker {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  /**
   * Title of the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.title
   */
  set title(title) {
    this._title = title;
  }
  _title;
  /**
   * Position of the marker. See:
   * developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.position
   */
  set position(position) {
    this._position = position;
  }
  _position;
  /**
   * Label for the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.label
   */
  set label(label) {
    this._label = label;
  }
  _label;
  /**
   * Whether the marker is clickable. See:
   * developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.clickable
   */
  set clickable(clickable) {
    this._clickable = clickable;
  }
  _clickable;
  /**
   * Options used to configure the marker.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
   */
  set options(options) {
    this._options = options;
  }
  _options;
  /**
   * Icon to be used for the marker.
   * See: https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
   */
  set icon(icon) {
    this._icon = icon;
  }
  _icon;
  /**
   * Whether the marker is visible.
   * See: developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.visible
   */
  set visible(value) {
    this._visible = value;
  }
  _visible;
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.animation_changed
   */
  animationChanged = this._eventManager.getLazyEmitter("animation_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.click
   */
  mapClick = this._eventManager.getLazyEmitter("click");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.clickable_changed
   */
  clickableChanged = this._eventManager.getLazyEmitter("clickable_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.cursor_changed
   */
  cursorChanged = this._eventManager.getLazyEmitter("cursor_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dblclick
   */
  mapDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.drag
   */
  mapDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dragend
   */
  mapDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.draggable_changed
   */
  draggableChanged = this._eventManager.getLazyEmitter("draggable_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.dragstart
   */
  mapDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.flat_changed
   */
  flatChanged = this._eventManager.getLazyEmitter("flat_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.icon_changed
   */
  iconChanged = this._eventManager.getLazyEmitter("icon_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mousedown
   */
  mapMousedown = this._eventManager.getLazyEmitter("mousedown");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseout
   */
  mapMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseover
   */
  mapMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.mouseup
   */
  mapMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.position_changed
   */
  positionChanged = this._eventManager.getLazyEmitter("position_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.rightclick
   */
  mapRightclick = this._eventManager.getLazyEmitter("rightclick");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.shape_changed
   */
  shapeChanged = this._eventManager.getLazyEmitter("shape_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.title_changed
   */
  titleChanged = this._eventManager.getLazyEmitter("title_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.visible_changed
   */
  visibleChanged = this._eventManager.getLazyEmitter("visible_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.zindex_changed
   */
  zindexChanged = this._eventManager.getLazyEmitter("zindex_changed");
  /** Event emitted when the marker is initialized. */
  markerInitialized = new EventEmitter();
  /**
   * The underlying google.maps.Marker object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/marker#Marker
   */
  marker;
  constructor() {
  }
  ngOnInit() {
    if (!this._googleMap._isBrowser) {
      return;
    }
    if (google.maps.Marker && this._googleMap.googleMap) {
      this._initialize(this._googleMap.googleMap, google.maps.Marker);
    } else {
      this._ngZone.runOutsideAngular(() => {
        Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("marker")]).then(([map2, lib]) => {
          this._initialize(map2, lib.Marker);
        });
      });
    }
  }
  _initialize(map2, markerConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.marker = new markerConstructor(this._combineOptions());
      this._assertInitialized();
      this.marker.setMap(map2);
      this._eventManager.setTarget(this.marker);
      this.markerInitialized.next(this.marker);
    });
  }
  ngOnChanges(changes) {
    const {
      marker,
      _title,
      _position,
      _label,
      _clickable,
      _icon,
      _visible
    } = this;
    if (marker) {
      if (changes["options"]) {
        marker.setOptions(this._combineOptions());
      }
      if (changes["title"] && _title !== void 0) {
        marker.setTitle(_title);
      }
      if (changes["position"] && _position) {
        marker.setPosition(_position);
      }
      if (changes["label"] && _label !== void 0) {
        marker.setLabel(_label);
      }
      if (changes["clickable"] && _clickable !== void 0) {
        marker.setClickable(_clickable);
      }
      if (changes["icon"] && _icon) {
        marker.setIcon(_icon);
      }
      if (changes["visible"] && _visible !== void 0) {
        marker.setVisible(_visible);
      }
    }
  }
  ngOnDestroy() {
    this.markerInitialized.complete();
    this._eventManager.destroy();
    this.marker?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getAnimation
   */
  getAnimation() {
    this._assertInitialized();
    return this.marker.getAnimation() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getClickable
   */
  getClickable() {
    this._assertInitialized();
    return this.marker.getClickable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getCursor
   */
  getCursor() {
    this._assertInitialized();
    return this.marker.getCursor() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return !!this.marker.getDraggable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getIcon
   */
  getIcon() {
    this._assertInitialized();
    return this.marker.getIcon() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getLabel
   */
  getLabel() {
    this._assertInitialized();
    return this.marker.getLabel() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getOpacity
   */
  getOpacity() {
    this._assertInitialized();
    return this.marker.getOpacity() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getPosition
   */
  getPosition() {
    this._assertInitialized();
    return this.marker.getPosition() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getShape
   */
  getShape() {
    this._assertInitialized();
    return this.marker.getShape() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getTitle
   */
  getTitle() {
    this._assertInitialized();
    return this.marker.getTitle() || null;
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.marker.getVisible();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/marker#Marker.getZIndex
   */
  getZIndex() {
    this._assertInitialized();
    return this.marker.getZIndex() || null;
  }
  /** Gets the anchor point that can be used to attach other Google Maps objects. */
  getAnchor() {
    this._assertInitialized();
    return this.marker;
  }
  /** Returns a promise that resolves when the marker has been initialized. */
  _resolveMarker() {
    return this.marker ? Promise.resolve(this.marker) : this.markerInitialized.pipe(take(1)).toPromise();
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || DEFAULT_MARKER_OPTIONS$1;
    return __spreadProps(__spreadValues({}, options), {
      title: this._title || options.title,
      position: this._position || options.position,
      label: this._label || options.label,
      clickable: this._clickable ?? options.clickable,
      map: this._googleMap.googleMap,
      icon: this._icon || options.icon,
      visible: this._visible ?? options.visible
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.marker) {
        throw Error("Cannot interact with a Google Map Marker before it has been initialized. Please wait for the Marker to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapMarker_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapMarker)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapMarker,
    selectors: [["map-marker"]],
    inputs: {
      title: "title",
      position: "position",
      label: "label",
      clickable: "clickable",
      options: "options",
      icon: "icon",
      visible: "visible"
    },
    outputs: {
      animationChanged: "animationChanged",
      mapClick: "mapClick",
      clickableChanged: "clickableChanged",
      cursorChanged: "cursorChanged",
      mapDblclick: "mapDblclick",
      mapDrag: "mapDrag",
      mapDragend: "mapDragend",
      draggableChanged: "draggableChanged",
      mapDragstart: "mapDragstart",
      flatChanged: "flatChanged",
      iconChanged: "iconChanged",
      mapMousedown: "mapMousedown",
      mapMouseout: "mapMouseout",
      mapMouseover: "mapMouseover",
      mapMouseup: "mapMouseup",
      positionChanged: "positionChanged",
      mapRightclick: "mapRightclick",
      shapeChanged: "shapeChanged",
      titleChanged: "titleChanged",
      visibleChanged: "visibleChanged",
      zindexChanged: "zindexChanged",
      markerInitialized: "markerInitialized"
    },
    exportAs: ["mapMarker"],
    features: [ɵɵProvidersFeature([{
      provide: MAP_MARKER,
      useExisting: _MapMarker
    }]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapMarker, [{
    type: Directive,
    args: [{
      selector: "map-marker",
      exportAs: "mapMarker",
      providers: [{
        provide: MAP_MARKER,
        useExisting: MapMarker
      }]
    }]
  }], () => [], {
    title: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    clickable: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    animationChanged: [{
      type: Output
    }],
    mapClick: [{
      type: Output
    }],
    clickableChanged: [{
      type: Output
    }],
    cursorChanged: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    draggableChanged: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    flatChanged: [{
      type: Output
    }],
    iconChanged: [{
      type: Output
    }],
    mapMousedown: [{
      type: Output
    }],
    mapMouseout: [{
      type: Output
    }],
    mapMouseover: [{
      type: Output
    }],
    mapMouseup: [{
      type: Output
    }],
    positionChanged: [{
      type: Output
    }],
    mapRightclick: [{
      type: Output
    }],
    shapeChanged: [{
      type: Output
    }],
    titleChanged: [{
      type: Output
    }],
    visibleChanged: [{
      type: Output
    }],
    zindexChanged: [{
      type: Output
    }],
    markerInitialized: [{
      type: Output
    }]
  });
})();
var DEFAULT_CLUSTERER_OPTIONS = {};
var DeprecatedMapMarkerClusterer = class _DeprecatedMapMarkerClusterer {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _currentMarkers = /* @__PURE__ */ new Set();
  _eventManager = new MapEventManager(inject(NgZone));
  _destroy = new Subject();
  /** Whether the clusterer is allowed to be initialized. */
  _canInitialize = this._googleMap._isBrowser;
  ariaLabelFn = () => "";
  set averageCenter(averageCenter) {
    this._averageCenter = averageCenter;
  }
  _averageCenter;
  batchSize;
  set batchSizeIE(batchSizeIE) {
    this._batchSizeIE = batchSizeIE;
  }
  _batchSizeIE;
  set calculator(calculator) {
    this._calculator = calculator;
  }
  _calculator;
  set clusterClass(clusterClass) {
    this._clusterClass = clusterClass;
  }
  _clusterClass;
  set enableRetinaIcons(enableRetinaIcons) {
    this._enableRetinaIcons = enableRetinaIcons;
  }
  _enableRetinaIcons;
  set gridSize(gridSize) {
    this._gridSize = gridSize;
  }
  _gridSize;
  set ignoreHidden(ignoreHidden) {
    this._ignoreHidden = ignoreHidden;
  }
  _ignoreHidden;
  set imageExtension(imageExtension) {
    this._imageExtension = imageExtension;
  }
  _imageExtension;
  set imagePath(imagePath) {
    this._imagePath = imagePath;
  }
  _imagePath;
  set imageSizes(imageSizes) {
    this._imageSizes = imageSizes;
  }
  _imageSizes;
  set maxZoom(maxZoom) {
    this._maxZoom = maxZoom;
  }
  _maxZoom;
  set minimumClusterSize(minimumClusterSize) {
    this._minimumClusterSize = minimumClusterSize;
  }
  _minimumClusterSize;
  set styles(styles) {
    this._styles = styles;
  }
  _styles;
  set title(title) {
    this._title = title;
  }
  _title;
  set zIndex(zIndex) {
    this._zIndex = zIndex;
  }
  _zIndex;
  set zoomOnClick(zoomOnClick) {
    this._zoomOnClick = zoomOnClick;
  }
  _zoomOnClick;
  set options(options) {
    this._options = options;
  }
  _options;
  /**
   * See
   * googlemaps.github.io/v3-utility-library/modules/
   * _google_markerclustererplus.html#clusteringbegin
   */
  clusteringbegin = this._eventManager.getLazyEmitter("clusteringbegin");
  /**
   * See
   * googlemaps.github.io/v3-utility-library/modules/_google_markerclustererplus.html#clusteringend
   */
  clusteringend = this._eventManager.getLazyEmitter("clusteringend");
  /** Emits when a cluster has been clicked. */
  clusterClick = this._eventManager.getLazyEmitter("click");
  _markers;
  /**
   * The underlying MarkerClusterer object.
   *
   * See
   * googlemaps.github.io/v3-utility-library/classes/
   * _google_markerclustererplus.markerclusterer.html
   */
  markerClusterer;
  /** Event emitted when the clusterer is initialized. */
  markerClustererInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._canInitialize) {
      this._ngZone.runOutsideAngular(() => {
        this._googleMap._resolveMap().then((map2) => {
          if (typeof MarkerClusterer !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
            throw Error("MarkerClusterer class not found, cannot construct a marker cluster. Please install the MarkerClustererPlus library: https://github.com/googlemaps/js-markerclustererplus");
          }
          this.markerClusterer = this._ngZone.runOutsideAngular(() => {
            return new MarkerClusterer(map2, [], this._combineOptions());
          });
          this._assertInitialized();
          this._eventManager.setTarget(this.markerClusterer);
          this.markerClustererInitialized.emit(this.markerClusterer);
        });
      });
    }
  }
  ngAfterContentInit() {
    if (this._canInitialize) {
      if (this.markerClusterer) {
        this._watchForMarkerChanges();
      } else {
        this.markerClustererInitialized.pipe(take(1), takeUntil(this._destroy)).subscribe(() => this._watchForMarkerChanges());
      }
    }
  }
  ngOnChanges(changes) {
    const {
      markerClusterer: clusterer,
      ariaLabelFn,
      _averageCenter,
      _batchSizeIE,
      _calculator,
      _styles,
      _clusterClass,
      _enableRetinaIcons,
      _gridSize,
      _ignoreHidden,
      _imageExtension,
      _imagePath,
      _imageSizes,
      _maxZoom,
      _minimumClusterSize,
      _title,
      _zIndex,
      _zoomOnClick
    } = this;
    if (clusterer) {
      if (changes["options"]) {
        clusterer.setOptions(this._combineOptions());
      }
      if (changes["ariaLabelFn"]) {
        clusterer.ariaLabelFn = ariaLabelFn;
      }
      if (changes["averageCenter"] && _averageCenter !== void 0) {
        clusterer.setAverageCenter(_averageCenter);
      }
      if (changes["batchSizeIE"] && _batchSizeIE !== void 0) {
        clusterer.setBatchSizeIE(_batchSizeIE);
      }
      if (changes["calculator"] && !!_calculator) {
        clusterer.setCalculator(_calculator);
      }
      if (changes["clusterClass"] && _clusterClass !== void 0) {
        clusterer.setClusterClass(_clusterClass);
      }
      if (changes["enableRetinaIcons"] && _enableRetinaIcons !== void 0) {
        clusterer.setEnableRetinaIcons(_enableRetinaIcons);
      }
      if (changes["gridSize"] && _gridSize !== void 0) {
        clusterer.setGridSize(_gridSize);
      }
      if (changes["ignoreHidden"] && _ignoreHidden !== void 0) {
        clusterer.setIgnoreHidden(_ignoreHidden);
      }
      if (changes["imageExtension"] && _imageExtension !== void 0) {
        clusterer.setImageExtension(_imageExtension);
      }
      if (changes["imagePath"] && _imagePath !== void 0) {
        clusterer.setImagePath(_imagePath);
      }
      if (changes["imageSizes"] && _imageSizes) {
        clusterer.setImageSizes(_imageSizes);
      }
      if (changes["maxZoom"] && _maxZoom !== void 0) {
        clusterer.setMaxZoom(_maxZoom);
      }
      if (changes["minimumClusterSize"] && _minimumClusterSize !== void 0) {
        clusterer.setMinimumClusterSize(_minimumClusterSize);
      }
      if (changes["styles"] && _styles) {
        clusterer.setStyles(_styles);
      }
      if (changes["title"] && _title !== void 0) {
        clusterer.setTitle(_title);
      }
      if (changes["zIndex"] && _zIndex !== void 0) {
        clusterer.setZIndex(_zIndex);
      }
      if (changes["zoomOnClick"] && _zoomOnClick !== void 0) {
        clusterer.setZoomOnClick(_zoomOnClick);
      }
    }
  }
  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._eventManager.destroy();
    this.markerClusterer?.setMap(null);
  }
  fitMapToMarkers(padding) {
    this._assertInitialized();
    this.markerClusterer.fitMapToMarkers(padding);
  }
  getAverageCenter() {
    this._assertInitialized();
    return this.markerClusterer.getAverageCenter();
  }
  getBatchSizeIE() {
    this._assertInitialized();
    return this.markerClusterer.getBatchSizeIE();
  }
  getCalculator() {
    this._assertInitialized();
    return this.markerClusterer.getCalculator();
  }
  getClusterClass() {
    this._assertInitialized();
    return this.markerClusterer.getClusterClass();
  }
  getClusters() {
    this._assertInitialized();
    return this.markerClusterer.getClusters();
  }
  getEnableRetinaIcons() {
    this._assertInitialized();
    return this.markerClusterer.getEnableRetinaIcons();
  }
  getGridSize() {
    this._assertInitialized();
    return this.markerClusterer.getGridSize();
  }
  getIgnoreHidden() {
    this._assertInitialized();
    return this.markerClusterer.getIgnoreHidden();
  }
  getImageExtension() {
    this._assertInitialized();
    return this.markerClusterer.getImageExtension();
  }
  getImagePath() {
    this._assertInitialized();
    return this.markerClusterer.getImagePath();
  }
  getImageSizes() {
    this._assertInitialized();
    return this.markerClusterer.getImageSizes();
  }
  getMaxZoom() {
    this._assertInitialized();
    return this.markerClusterer.getMaxZoom();
  }
  getMinimumClusterSize() {
    this._assertInitialized();
    return this.markerClusterer.getMinimumClusterSize();
  }
  getStyles() {
    this._assertInitialized();
    return this.markerClusterer.getStyles();
  }
  getTitle() {
    this._assertInitialized();
    return this.markerClusterer.getTitle();
  }
  getTotalClusters() {
    this._assertInitialized();
    return this.markerClusterer.getTotalClusters();
  }
  getTotalMarkers() {
    this._assertInitialized();
    return this.markerClusterer.getTotalMarkers();
  }
  getZIndex() {
    this._assertInitialized();
    return this.markerClusterer.getZIndex();
  }
  getZoomOnClick() {
    this._assertInitialized();
    return this.markerClusterer.getZoomOnClick();
  }
  _combineOptions() {
    const options = this._options || DEFAULT_CLUSTERER_OPTIONS;
    return __spreadProps(__spreadValues({}, options), {
      ariaLabelFn: this.ariaLabelFn ?? options.ariaLabelFn,
      averageCenter: this._averageCenter ?? options.averageCenter,
      batchSize: this.batchSize ?? options.batchSize,
      batchSizeIE: this._batchSizeIE ?? options.batchSizeIE,
      calculator: this._calculator ?? options.calculator,
      clusterClass: this._clusterClass ?? options.clusterClass,
      enableRetinaIcons: this._enableRetinaIcons ?? options.enableRetinaIcons,
      gridSize: this._gridSize ?? options.gridSize,
      ignoreHidden: this._ignoreHidden ?? options.ignoreHidden,
      imageExtension: this._imageExtension ?? options.imageExtension,
      imagePath: this._imagePath ?? options.imagePath,
      imageSizes: this._imageSizes ?? options.imageSizes,
      maxZoom: this._maxZoom ?? options.maxZoom,
      minimumClusterSize: this._minimumClusterSize ?? options.minimumClusterSize,
      styles: this._styles ?? options.styles,
      title: this._title ?? options.title,
      zIndex: this._zIndex ?? options.zIndex,
      zoomOnClick: this._zoomOnClick ?? options.zoomOnClick
    });
  }
  _watchForMarkerChanges() {
    this._assertInitialized();
    this._ngZone.runOutsideAngular(() => {
      this._getInternalMarkers(this._markers).then((markers) => {
        const initialMarkers = [];
        for (const marker of markers) {
          this._currentMarkers.add(marker);
          initialMarkers.push(marker);
        }
        this.markerClusterer.addMarkers(initialMarkers);
      });
    });
    this._markers.changes.pipe(takeUntil(this._destroy)).subscribe((markerComponents) => {
      this._assertInitialized();
      this._ngZone.runOutsideAngular(() => {
        this._getInternalMarkers(markerComponents).then((markers) => {
          const newMarkers = new Set(markers);
          const markersToAdd = [];
          const markersToRemove = [];
          for (const marker of Array.from(newMarkers)) {
            if (!this._currentMarkers.has(marker)) {
              this._currentMarkers.add(marker);
              markersToAdd.push(marker);
            }
          }
          for (const marker of Array.from(this._currentMarkers)) {
            if (!newMarkers.has(marker)) {
              markersToRemove.push(marker);
            }
          }
          this.markerClusterer.addMarkers(markersToAdd, true);
          this.markerClusterer.removeMarkers(markersToRemove, true);
          this.markerClusterer.repaint();
          for (const marker of markersToRemove) {
            this._currentMarkers.delete(marker);
          }
        });
      });
    });
  }
  _getInternalMarkers(markers) {
    return Promise.all(markers.map((markerComponent) => markerComponent._resolveMarker()));
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.markerClusterer) {
        throw Error("Cannot interact with a MarkerClusterer before it has been initialized. Please wait for the MarkerClusterer to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function DeprecatedMapMarkerClusterer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeprecatedMapMarkerClusterer)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _DeprecatedMapMarkerClusterer,
    selectors: [["deprecated-map-marker-clusterer"]],
    contentQueries: function DeprecatedMapMarkerClusterer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MapMarker, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._markers = _t);
      }
    },
    inputs: {
      ariaLabelFn: "ariaLabelFn",
      averageCenter: "averageCenter",
      batchSize: "batchSize",
      batchSizeIE: "batchSizeIE",
      calculator: "calculator",
      clusterClass: "clusterClass",
      enableRetinaIcons: "enableRetinaIcons",
      gridSize: "gridSize",
      ignoreHidden: "ignoreHidden",
      imageExtension: "imageExtension",
      imagePath: "imagePath",
      imageSizes: "imageSizes",
      maxZoom: "maxZoom",
      minimumClusterSize: "minimumClusterSize",
      styles: "styles",
      title: "title",
      zIndex: "zIndex",
      zoomOnClick: "zoomOnClick",
      options: "options"
    },
    outputs: {
      clusteringbegin: "clusteringbegin",
      clusteringend: "clusteringend",
      clusterClick: "clusterClick",
      markerClustererInitialized: "markerClustererInitialized"
    },
    exportAs: ["mapMarkerClusterer"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DeprecatedMapMarkerClusterer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeprecatedMapMarkerClusterer, [{
    type: Component,
    args: [{
      selector: "deprecated-map-marker-clusterer",
      exportAs: "mapMarkerClusterer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content/>",
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    ariaLabelFn: [{
      type: Input
    }],
    averageCenter: [{
      type: Input
    }],
    batchSize: [{
      type: Input
    }],
    batchSizeIE: [{
      type: Input
    }],
    calculator: [{
      type: Input
    }],
    clusterClass: [{
      type: Input
    }],
    enableRetinaIcons: [{
      type: Input
    }],
    gridSize: [{
      type: Input
    }],
    ignoreHidden: [{
      type: Input
    }],
    imageExtension: [{
      type: Input
    }],
    imagePath: [{
      type: Input
    }],
    imageSizes: [{
      type: Input
    }],
    maxZoom: [{
      type: Input
    }],
    minimumClusterSize: [{
      type: Input
    }],
    styles: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    zIndex: [{
      type: Input
    }],
    zoomOnClick: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    clusteringbegin: [{
      type: Output
    }],
    clusteringend: [{
      type: Output
    }],
    clusterClick: [{
      type: Output
    }],
    _markers: [{
      type: ContentChildren,
      args: [MapMarker, {
        descendants: true
      }]
    }],
    markerClustererInitialized: [{
      type: Output
    }]
  });
})();
var MapPolygon = class _MapPolygon {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _paths = new BehaviorSubject(void 0);
  _destroyed = new Subject();
  /**
   * The underlying google.maps.Polygon object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
   */
  polygon;
  set options(options) {
    this._options.next(options || {});
  }
  set paths(paths) {
    this._paths.next(paths);
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.click
   */
  polygonClick = this._eventManager.getLazyEmitter("click");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.dblclick
   */
  polygonDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.drag
   */
  polygonDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.dragend
   */
  polygonDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.dragstart
   */
  polygonDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.mousedown
   */
  polygonMousedown = this._eventManager.getLazyEmitter("mousedown");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.mousemove
   */
  polygonMousemove = this._eventManager.getLazyEmitter("mousemove");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.mouseout
   */
  polygonMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.mouseover
   */
  polygonMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.mouseup
   */
  polygonMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.rightclick
   */
  polygonRightclick = this._eventManager.getLazyEmitter("rightclick");
  /** Event emitted when the polygon is initialized. */
  polygonInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Polygon && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Polygon, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Polygon, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, polygonConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.polygon = new polygonConstructor(options);
      this._assertInitialized();
      this.polygon.setMap(map2);
      this._eventManager.setTarget(this.polygon);
      this.polygonInitialized.emit(this.polygon);
      this._watchForOptionsChanges();
      this._watchForPathChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.polygon?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.polygon.getDraggable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.polygon.getEditable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getPath
   */
  getPath() {
    this._assertInitialized();
    return this.polygon.getPath();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getPaths
   */
  getPaths() {
    this._assertInitialized();
    return this.polygon.getPaths();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polygon.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.polygon.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._paths]).pipe(map(([options, paths]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        paths: paths || options.paths
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.polygon.setOptions(options);
    });
  }
  _watchForPathChanges() {
    this._paths.pipe(takeUntil(this._destroyed)).subscribe((paths) => {
      if (paths) {
        this._assertInitialized();
        this.polygon.setPaths(paths);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.polygon) {
        throw Error("Cannot interact with a Google Map Polygon before it has been initialized. Please wait for the Polygon to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapPolygon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapPolygon)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapPolygon,
    selectors: [["map-polygon"]],
    inputs: {
      options: "options",
      paths: "paths"
    },
    outputs: {
      polygonClick: "polygonClick",
      polygonDblclick: "polygonDblclick",
      polygonDrag: "polygonDrag",
      polygonDragend: "polygonDragend",
      polygonDragstart: "polygonDragstart",
      polygonMousedown: "polygonMousedown",
      polygonMousemove: "polygonMousemove",
      polygonMouseout: "polygonMouseout",
      polygonMouseover: "polygonMouseover",
      polygonMouseup: "polygonMouseup",
      polygonRightclick: "polygonRightclick",
      polygonInitialized: "polygonInitialized"
    },
    exportAs: ["mapPolygon"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapPolygon, [{
    type: Directive,
    args: [{
      selector: "map-polygon",
      exportAs: "mapPolygon"
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    paths: [{
      type: Input
    }],
    polygonClick: [{
      type: Output
    }],
    polygonDblclick: [{
      type: Output
    }],
    polygonDrag: [{
      type: Output
    }],
    polygonDragend: [{
      type: Output
    }],
    polygonDragstart: [{
      type: Output
    }],
    polygonMousedown: [{
      type: Output
    }],
    polygonMousemove: [{
      type: Output
    }],
    polygonMouseout: [{
      type: Output
    }],
    polygonMouseover: [{
      type: Output
    }],
    polygonMouseup: [{
      type: Output
    }],
    polygonRightclick: [{
      type: Output
    }],
    polygonInitialized: [{
      type: Output
    }]
  });
})();
var MapPolyline = class _MapPolyline {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _path = new BehaviorSubject(void 0);
  _destroyed = new Subject();
  /**
   * The underlying google.maps.Polyline object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
   */
  polyline;
  set options(options) {
    this._options.next(options || {});
  }
  set path(path) {
    this._path.next(path);
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.click
   */
  polylineClick = this._eventManager.getLazyEmitter("click");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.dblclick
   */
  polylineDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.drag
   */
  polylineDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.dragend
   */
  polylineDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.dragstart
   */
  polylineDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.mousedown
   */
  polylineMousedown = this._eventManager.getLazyEmitter("mousedown");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.mousemove
   */
  polylineMousemove = this._eventManager.getLazyEmitter("mousemove");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.mouseout
   */
  polylineMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.mouseover
   */
  polylineMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.mouseup
   */
  polylineMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.rightclick
   */
  polylineRightclick = this._eventManager.getLazyEmitter("rightclick");
  /** Event emitted when the polyline is initialized. */
  polylineInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Polyline && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Polyline, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Polyline, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, polylineConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.polyline = new polylineConstructor(options);
      this._assertInitialized();
      this.polyline.setMap(map2);
      this._eventManager.setTarget(this.polyline);
      this.polylineInitialized.emit(this.polyline);
      this._watchForOptionsChanges();
      this._watchForPathChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.polyline?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.polyline.getDraggable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.polyline.getEditable();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getPath
   */
  getPath() {
    this._assertInitialized();
    return this.polyline.getPath();
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.polyline.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._path]).pipe(map(([options, path]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        path: path || options.path
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.polyline.setOptions(options);
    });
  }
  _watchForPathChanges() {
    this._path.pipe(takeUntil(this._destroyed)).subscribe((path) => {
      if (path) {
        this._assertInitialized();
        this.polyline.setPath(path);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.polyline) {
        throw Error("Cannot interact with a Google Map Polyline before it has been initialized. Please wait for the Polyline to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapPolyline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapPolyline)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapPolyline,
    selectors: [["map-polyline"]],
    inputs: {
      options: "options",
      path: "path"
    },
    outputs: {
      polylineClick: "polylineClick",
      polylineDblclick: "polylineDblclick",
      polylineDrag: "polylineDrag",
      polylineDragend: "polylineDragend",
      polylineDragstart: "polylineDragstart",
      polylineMousedown: "polylineMousedown",
      polylineMousemove: "polylineMousemove",
      polylineMouseout: "polylineMouseout",
      polylineMouseover: "polylineMouseover",
      polylineMouseup: "polylineMouseup",
      polylineRightclick: "polylineRightclick",
      polylineInitialized: "polylineInitialized"
    },
    exportAs: ["mapPolyline"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapPolyline, [{
    type: Directive,
    args: [{
      selector: "map-polyline",
      exportAs: "mapPolyline"
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    path: [{
      type: Input
    }],
    polylineClick: [{
      type: Output
    }],
    polylineDblclick: [{
      type: Output
    }],
    polylineDrag: [{
      type: Output
    }],
    polylineDragend: [{
      type: Output
    }],
    polylineDragstart: [{
      type: Output
    }],
    polylineMousedown: [{
      type: Output
    }],
    polylineMousemove: [{
      type: Output
    }],
    polylineMouseout: [{
      type: Output
    }],
    polylineMouseover: [{
      type: Output
    }],
    polylineMouseup: [{
      type: Output
    }],
    polylineRightclick: [{
      type: Output
    }],
    polylineInitialized: [{
      type: Output
    }]
  });
})();
var MapRectangle = class _MapRectangle {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  _options = new BehaviorSubject({});
  _bounds = new BehaviorSubject(void 0);
  _destroyed = new Subject();
  /**
   * The underlying google.maps.Rectangle object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
   */
  rectangle;
  set options(options) {
    this._options.next(options || {});
  }
  set bounds(bounds) {
    this._bounds.next(bounds);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.boundsChanged
   */
  boundsChanged = this._eventManager.getLazyEmitter("bounds_changed");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.click
   */
  rectangleClick = this._eventManager.getLazyEmitter("click");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.dblclick
   */
  rectangleDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.drag
   */
  rectangleDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.dragend
   */
  rectangleDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.dragstart
   */
  rectangleDragstart = this._eventManager.getLazyEmitter("dragstart");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.mousedown
   */
  rectangleMousedown = this._eventManager.getLazyEmitter("mousedown");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.mousemove
   */
  rectangleMousemove = this._eventManager.getLazyEmitter("mousemove");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.mouseout
   */
  rectangleMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.mouseover
   */
  rectangleMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.mouseup
   */
  rectangleMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.rightclick
   */
  rectangleRightclick = this._eventManager.getLazyEmitter("rightclick");
  /** Event emitted when the rectangle is initialized. */
  rectangleInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.Rectangle && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.Rectangle, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.Rectangle, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, rectangleConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.rectangle = new rectangleConstructor(options);
      this._assertInitialized();
      this.rectangle.setMap(map2);
      this._eventManager.setTarget(this.rectangle);
      this.rectangleInitialized.emit(this.rectangle);
      this._watchForOptionsChanges();
      this._watchForBoundsChanges();
    });
  }
  ngOnDestroy() {
    this._eventManager.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this.rectangle?.setMap(null);
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getBounds
   */
  getBounds() {
    this._assertInitialized();
    return this.rectangle.getBounds();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getDraggable
   */
  getDraggable() {
    this._assertInitialized();
    return this.rectangle.getDraggable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getEditable
   */
  getEditable() {
    this._assertInitialized();
    return this.rectangle.getEditable();
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle.getVisible
   */
  getVisible() {
    this._assertInitialized();
    return this.rectangle.getVisible();
  }
  _combineOptions() {
    return combineLatest([this._options, this._bounds]).pipe(map(([options, bounds]) => {
      const combinedOptions = __spreadProps(__spreadValues({}, options), {
        bounds: bounds || options.bounds
      });
      return combinedOptions;
    }));
  }
  _watchForOptionsChanges() {
    this._options.pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.rectangle.setOptions(options);
    });
  }
  _watchForBoundsChanges() {
    this._bounds.pipe(takeUntil(this._destroyed)).subscribe((bounds) => {
      if (bounds) {
        this._assertInitialized();
        this.rectangle.setBounds(bounds);
      }
    });
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.rectangle) {
        throw Error("Cannot interact with a Google Map Rectangle before it has been initialized. Please wait for the Rectangle to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapRectangle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapRectangle)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapRectangle,
    selectors: [["map-rectangle"]],
    inputs: {
      options: "options",
      bounds: "bounds"
    },
    outputs: {
      boundsChanged: "boundsChanged",
      rectangleClick: "rectangleClick",
      rectangleDblclick: "rectangleDblclick",
      rectangleDrag: "rectangleDrag",
      rectangleDragend: "rectangleDragend",
      rectangleDragstart: "rectangleDragstart",
      rectangleMousedown: "rectangleMousedown",
      rectangleMousemove: "rectangleMousemove",
      rectangleMouseout: "rectangleMouseout",
      rectangleMouseover: "rectangleMouseover",
      rectangleMouseup: "rectangleMouseup",
      rectangleRightclick: "rectangleRightclick",
      rectangleInitialized: "rectangleInitialized"
    },
    exportAs: ["mapRectangle"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapRectangle, [{
    type: Directive,
    args: [{
      selector: "map-rectangle",
      exportAs: "mapRectangle"
    }]
  }], () => [], {
    options: [{
      type: Input
    }],
    bounds: [{
      type: Input
    }],
    boundsChanged: [{
      type: Output
    }],
    rectangleClick: [{
      type: Output
    }],
    rectangleDblclick: [{
      type: Output
    }],
    rectangleDrag: [{
      type: Output
    }],
    rectangleDragend: [{
      type: Output
    }],
    rectangleDragstart: [{
      type: Output
    }],
    rectangleMousedown: [{
      type: Output
    }],
    rectangleMousemove: [{
      type: Output
    }],
    rectangleMouseout: [{
      type: Output
    }],
    rectangleMouseover: [{
      type: Output
    }],
    rectangleMouseup: [{
      type: Output
    }],
    rectangleRightclick: [{
      type: Output
    }],
    rectangleInitialized: [{
      type: Output
    }]
  });
})();
var MapTrafficLayer = class _MapTrafficLayer {
  _map = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _autoRefresh = new BehaviorSubject(true);
  _destroyed = new Subject();
  /**
   * The underlying google.maps.TrafficLayer object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/map#TrafficLayer
   */
  trafficLayer;
  /**
   * Whether the traffic layer refreshes with updated information automatically.
   */
  set autoRefresh(autoRefresh) {
    this._autoRefresh.next(autoRefresh);
  }
  /** Event emitted when the traffic layer is initialized. */
  trafficLayerInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._map._isBrowser) {
      this._combineOptions().pipe(take(1)).subscribe((options) => {
        if (google.maps.TrafficLayer && this._map.googleMap) {
          this._initialize(this._map.googleMap, google.maps.TrafficLayer, options);
        } else {
          this._ngZone.runOutsideAngular(() => {
            Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
              this._initialize(map2, lib.TrafficLayer, options);
            });
          });
        }
      });
    }
  }
  _initialize(map2, layerConstructor, options) {
    this._ngZone.runOutsideAngular(() => {
      this.trafficLayer = new layerConstructor(options);
      this._assertInitialized();
      this.trafficLayer.setMap(map2);
      this.trafficLayerInitialized.emit(this.trafficLayer);
      this._watchForAutoRefreshChanges();
    });
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this.trafficLayer?.setMap(null);
  }
  _combineOptions() {
    return this._autoRefresh.pipe(map((autoRefresh) => {
      const combinedOptions = {
        autoRefresh
      };
      return combinedOptions;
    }));
  }
  _watchForAutoRefreshChanges() {
    this._combineOptions().pipe(takeUntil(this._destroyed)).subscribe((options) => {
      this._assertInitialized();
      this.trafficLayer.setOptions(options);
    });
  }
  _assertInitialized() {
    if (!this.trafficLayer) {
      throw Error("Cannot interact with a Google Map Traffic Layer before it has been initialized. Please wait for the Traffic Layer to load before trying to interact with it.");
    }
  }
  static ɵfac = function MapTrafficLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapTrafficLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapTrafficLayer,
    selectors: [["map-traffic-layer"]],
    inputs: {
      autoRefresh: "autoRefresh"
    },
    outputs: {
      trafficLayerInitialized: "trafficLayerInitialized"
    },
    exportAs: ["mapTrafficLayer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapTrafficLayer, [{
    type: Directive,
    args: [{
      selector: "map-traffic-layer",
      exportAs: "mapTrafficLayer"
    }]
  }], () => [], {
    autoRefresh: [{
      type: Input
    }],
    trafficLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapTransitLayer = class _MapTransitLayer {
  _map = inject(GoogleMap);
  _zone = inject(NgZone);
  /**
   * The underlying google.maps.TransitLayer object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/map#TransitLayer
   */
  transitLayer;
  /** Event emitted when the transit layer is initialized. */
  transitLayerInitialized = new EventEmitter();
  ngOnInit() {
    if (this._map._isBrowser) {
      if (google.maps.TransitLayer && this._map.googleMap) {
        this._initialize(this._map.googleMap, google.maps.TransitLayer);
      } else {
        this._zone.runOutsideAngular(() => {
          Promise.all([this._map._resolveMap(), google.maps.importLibrary("maps")]).then(([map2, lib]) => {
            this._initialize(map2, lib.TransitLayer);
          });
        });
      }
    }
  }
  _initialize(map2, layerConstructor) {
    this._zone.runOutsideAngular(() => {
      this.transitLayer = new layerConstructor();
      this.transitLayerInitialized.emit(this.transitLayer);
      this._assertLayerInitialized();
      this.transitLayer.setMap(map2);
    });
  }
  ngOnDestroy() {
    this.transitLayer?.setMap(null);
  }
  _assertLayerInitialized() {
    if (!this.transitLayer) {
      throw Error("Cannot interact with a Google Map Transit Layer before it has been initialized. Please wait for the Transit Layer to load before trying to interact with it.");
    }
  }
  static ɵfac = function MapTransitLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapTransitLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapTransitLayer,
    selectors: [["map-transit-layer"]],
    outputs: {
      transitLayerInitialized: "transitLayerInitialized"
    },
    exportAs: ["mapTransitLayer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapTransitLayer, [{
    type: Directive,
    args: [{
      selector: "map-transit-layer",
      exportAs: "mapTransitLayer"
    }]
  }], null, {
    transitLayerInitialized: [{
      type: Output
    }]
  });
})();
var MapHeatmapLayer = class _MapHeatmapLayer {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  /**
   * Data shown on the heatmap.
   * See: https://developers.google.com/maps/documentation/javascript/reference/visualization
   */
  set data(data) {
    this._data = data;
  }
  _data;
  /**
   * Options used to configure the heatmap. See:
   * developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions
   */
  set options(options) {
    this._options = options;
  }
  _options;
  /**
   * The underlying google.maps.visualization.HeatmapLayer object.
   *
   * See: https://developers.google.com/maps/documentation/javascript/reference/visualization
   */
  heatmap;
  /** Event emitted when the heatmap is initialized. */
  heatmapInitialized = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    if (this._googleMap._isBrowser) {
      if (!window.google?.maps?.visualization && !window.google?.maps.importLibrary && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error('Namespace `google.maps.visualization` not found, cannot construct heatmap. Please install the Google Maps JavaScript API with the "visualization" library: https://developers.google.com/maps/documentation/javascript/visualization');
      }
      if (google.maps.visualization?.HeatmapLayer && this._googleMap.googleMap) {
        this._initialize(this._googleMap.googleMap, google.maps.visualization.HeatmapLayer);
      } else {
        this._ngZone.runOutsideAngular(() => {
          Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("visualization")]).then(([map2, lib]) => {
            this._initialize(map2, lib.HeatmapLayer);
          });
        });
      }
    }
  }
  _initialize(map2, heatmapConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.heatmap = new heatmapConstructor(this._combineOptions());
      this._assertInitialized();
      this.heatmap.setMap(map2);
      this.heatmapInitialized.emit(this.heatmap);
    });
  }
  ngOnChanges(changes) {
    const {
      _data,
      heatmap
    } = this;
    if (heatmap) {
      if (changes["options"]) {
        heatmap.setOptions(this._combineOptions());
      }
      if (changes["data"] && _data !== void 0) {
        heatmap.setData(this._normalizeData(_data));
      }
    }
  }
  ngOnDestroy() {
    this.heatmap?.setMap(null);
  }
  /**
   * Gets the data that is currently shown on the heatmap.
   * See: developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
   */
  getData() {
    this._assertInitialized();
    return this.heatmap.getData();
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || {};
    return __spreadProps(__spreadValues({}, options), {
      data: this._normalizeData(this._data || options.data || []),
      map: this._googleMap.googleMap
    });
  }
  /**
   * Most Google Maps APIs support both `LatLng` objects and `LatLngLiteral`. The latter is more
   * convenient to write out, because the Google Maps API doesn't have to have been loaded in order
   * to construct them. The `HeatmapLayer` appears to be an exception that only allows a `LatLng`
   * object, or it throws a runtime error. Since it's more convenient and we expect that Angular
   * users will load the API asynchronously, we allow them to pass in a `LatLngLiteral` and we
   * convert it to a `LatLng` object before passing it off to Google Maps.
   */
  _normalizeData(data) {
    const result = [];
    data.forEach((item) => {
      result.push(isLatLngLiteral(item) ? new google.maps.LatLng(item.lat, item.lng) : item);
    });
    return result;
  }
  /** Asserts that the heatmap object has been initialized. */
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.heatmap) {
        throw Error("Cannot interact with a Google Map HeatmapLayer before it has been initialized. Please wait for the heatmap to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapHeatmapLayer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapHeatmapLayer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapHeatmapLayer,
    selectors: [["map-heatmap-layer"]],
    inputs: {
      data: "data",
      options: "options"
    },
    outputs: {
      heatmapInitialized: "heatmapInitialized"
    },
    exportAs: ["mapHeatmapLayer"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapHeatmapLayer, [{
    type: Directive,
    args: [{
      selector: "map-heatmap-layer",
      exportAs: "mapHeatmapLayer"
    }]
  }], () => [], {
    data: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    heatmapInitialized: [{
      type: Output
    }]
  });
})();
function isLatLngLiteral(value) {
  return value && typeof value.lat === "number" && typeof value.lng === "number";
}
var DEFAULT_MARKER_OPTIONS = {
  position: {
    lat: 37.221995,
    lng: -122.184092
  }
};
var MapAdvancedMarker = class _MapAdvancedMarker {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _eventManager = new MapEventManager(inject(NgZone));
  /**
   * Rollover text. If provided, an accessibility text (e.g. for use with screen readers) will be added to the AdvancedMarkerElement with the provided value.
   * See: https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.title
   */
  set title(title) {
    this._title = title;
  }
  _title;
  /**
   * Sets the AdvancedMarkerElement's position. An AdvancedMarkerElement may be constructed without a position, but will not be displayed until its position is provided - for example, by a user's actions or choices. An AdvancedMarkerElement's position can be provided by setting AdvancedMarkerElement.position if not provided at the construction.
   * Note: AdvancedMarkerElement with altitude is only supported on vector maps.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.position
   */
  set position(position) {
    this._position = position;
  }
  _position;
  /**
   * The DOM Element backing the visual of an AdvancedMarkerElement.
   * Note: AdvancedMarkerElement does not clone the passed-in DOM element. Once the DOM element is passed to an AdvancedMarkerElement, passing the same DOM element to another AdvancedMarkerElement will move the DOM element and cause the previous AdvancedMarkerElement to look empty.
   * See: https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.content
   */
  set content(content) {
    this._content = content;
  }
  _content;
  /**
   * If true, the AdvancedMarkerElement can be dragged.
   * Note: AdvancedMarkerElement with altitude is not draggable.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.gmpDraggable
   */
  set gmpDraggable(draggable) {
    this._draggable = draggable;
  }
  _draggable;
  /**
   * Options for constructing an AdvancedMarkerElement.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions
   */
  set options(options) {
    this._options = options;
  }
  _options;
  /**
   * AdvancedMarkerElements on the map are prioritized by zIndex, with higher values indicating higher display.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.zIndex
   */
  set zIndex(zIndex) {
    this._zIndex = zIndex;
  }
  _zIndex;
  /**
   * This event is fired when the AdvancedMarkerElement element is clicked.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.click
   */
  mapClick = this._eventManager.getLazyEmitter("click");
  /**
   * This event is fired when the AdvancedMarkerElement is double-clicked.
   */
  mapDblclick = this._eventManager.getLazyEmitter("dblclick");
  /**
   * This event is fired when the mouse moves out of the AdvancedMarkerElement.
   */
  mapMouseout = this._eventManager.getLazyEmitter("mouseout");
  /**
   * This event is fired when the mouse moves over the AdvancedMarkerElement.
   */
  mapMouseover = this._eventManager.getLazyEmitter("mouseover");
  /**
   * This event is fired when the mouse button is released over the AdvancedMarkerElement.
   */
  mapMouseup = this._eventManager.getLazyEmitter("mouseup");
  /**
   * This event is fired when the AdvancedMarkerElement is right-clicked.
   */
  mapRightclick = this._eventManager.getLazyEmitter("rightclick");
  /**
   * This event is repeatedly fired while the user drags the AdvancedMarkerElement.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.drag
   */
  mapDrag = this._eventManager.getLazyEmitter("drag");
  /**
   * This event is fired when the user stops dragging the AdvancedMarkerElement.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.dragend
   */
  mapDragend = this._eventManager.getLazyEmitter("dragend");
  /**
   * This event is fired when the user starts dragging the AdvancedMarkerElement.
   * https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.dragstart
   */
  mapDragstart = this._eventManager.getLazyEmitter("dragstart");
  /** Event emitted when the marker is initialized. */
  markerInitialized = new EventEmitter();
  /**
   * The underlying google.maps.marker.AdvancedMarkerElement object.
   *
   * See developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement
   */
  advancedMarker;
  constructor() {
  }
  ngOnInit() {
    if (!this._googleMap._isBrowser) {
      return;
    }
    if (google.maps.marker?.AdvancedMarkerElement && this._googleMap.googleMap) {
      this._initialize(this._googleMap.googleMap, google.maps.marker.AdvancedMarkerElement);
    } else {
      this._ngZone.runOutsideAngular(() => {
        Promise.all([this._googleMap._resolveMap(), google.maps.importLibrary("marker")]).then(([map2, lib]) => {
          this._initialize(map2, lib.AdvancedMarkerElement);
        });
      });
    }
  }
  _initialize(map2, advancedMarkerConstructor) {
    this._ngZone.runOutsideAngular(() => {
      this.advancedMarker = new advancedMarkerConstructor(this._combineOptions());
      this._assertInitialized();
      this.advancedMarker.map = map2;
      this._eventManager.setTarget(this.advancedMarker);
      this.markerInitialized.next(this.advancedMarker);
    });
  }
  ngOnChanges(changes) {
    const {
      advancedMarker,
      _content,
      _position,
      _title,
      _draggable,
      _zIndex
    } = this;
    if (advancedMarker) {
      if (changes["title"]) {
        advancedMarker.title = _title;
      }
      if (changes["gmpDraggable"]) {
        advancedMarker.gmpDraggable = _draggable;
      }
      if (changes["content"]) {
        advancedMarker.content = _content;
      }
      if (changes["position"]) {
        advancedMarker.position = _position;
      }
      if (changes["zIndex"]) {
        advancedMarker.zIndex = _zIndex;
      }
    }
  }
  ngOnDestroy() {
    this.markerInitialized.complete();
    this._eventManager.destroy();
    if (this.advancedMarker) {
      this.advancedMarker.map = null;
    }
  }
  getAnchor() {
    this._assertInitialized();
    return this.advancedMarker;
  }
  /** Returns a promise that resolves when the marker has been initialized. */
  _resolveMarker() {
    return this.advancedMarker ? Promise.resolve(this.advancedMarker) : this.markerInitialized.pipe(take(1)).toPromise();
  }
  /** Creates a combined options object using the passed-in options and the individual inputs. */
  _combineOptions() {
    const options = this._options || DEFAULT_MARKER_OPTIONS;
    return __spreadProps(__spreadValues({}, options), {
      title: this._title || options.title,
      position: this._position || options.position,
      content: this._content || options.content,
      zIndex: this._zIndex ?? options.zIndex,
      gmpDraggable: this._draggable ?? options.gmpDraggable,
      map: this._googleMap.googleMap
    });
  }
  /** Asserts that the map has been initialized. */
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.advancedMarker) {
        throw Error("Cannot interact with a Google Map Marker before it has been initialized. Please wait for the Marker to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapAdvancedMarker_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapAdvancedMarker)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MapAdvancedMarker,
    selectors: [["map-advanced-marker"]],
    inputs: {
      title: "title",
      position: "position",
      content: "content",
      gmpDraggable: "gmpDraggable",
      options: "options",
      zIndex: "zIndex"
    },
    outputs: {
      mapClick: "mapClick",
      mapDblclick: "mapDblclick",
      mapMouseout: "mapMouseout",
      mapMouseover: "mapMouseover",
      mapMouseup: "mapMouseup",
      mapRightclick: "mapRightclick",
      mapDrag: "mapDrag",
      mapDragend: "mapDragend",
      mapDragstart: "mapDragstart",
      markerInitialized: "markerInitialized"
    },
    exportAs: ["mapAdvancedMarker"],
    features: [ɵɵProvidersFeature([{
      provide: MAP_MARKER,
      useExisting: _MapAdvancedMarker
    }]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapAdvancedMarker, [{
    type: Directive,
    args: [{
      selector: "map-advanced-marker",
      exportAs: "mapAdvancedMarker",
      providers: [{
        provide: MAP_MARKER,
        useExisting: MapAdvancedMarker
      }]
    }]
  }], () => [], {
    title: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    content: [{
      type: Input
    }],
    gmpDraggable: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    zIndex: [{
      type: Input
    }],
    mapClick: [{
      type: Output
    }],
    mapDblclick: [{
      type: Output
    }],
    mapMouseout: [{
      type: Output
    }],
    mapMouseover: [{
      type: Output
    }],
    mapMouseup: [{
      type: Output
    }],
    mapRightclick: [{
      type: Output
    }],
    mapDrag: [{
      type: Output
    }],
    mapDragend: [{
      type: Output
    }],
    mapDragstart: [{
      type: Output
    }],
    markerInitialized: [{
      type: Output
    }]
  });
})();
var MapMarkerClusterer = class _MapMarkerClusterer {
  _googleMap = inject(GoogleMap);
  _ngZone = inject(NgZone);
  _currentMarkers = /* @__PURE__ */ new Set();
  _closestMapEventManager = new MapEventManager(this._ngZone);
  _markersSubscription = Subscription.EMPTY;
  /** Whether the clusterer is allowed to be initialized. */
  _canInitialize = this._googleMap._isBrowser;
  /**
   * Used to customize how the marker cluster is rendered.
   * See https://googlemaps.github.io/js-markerclusterer/interfaces/Renderer.html.
   */
  renderer;
  /**
   * Algorithm used to cluster the markers.
   * See https://googlemaps.github.io/js-markerclusterer/interfaces/Algorithm.html.
   */
  algorithm;
  /** Emits when clustering has started. */
  clusteringbegin = this._closestMapEventManager.getLazyEmitter("clusteringbegin");
  /** Emits when clustering is done. */
  clusteringend = this._closestMapEventManager.getLazyEmitter("clusteringend");
  /** Emits when a cluster has been clicked. */
  clusterClick = new EventEmitter();
  /** Event emitted when the marker clusterer is initialized. */
  markerClustererInitialized = new EventEmitter();
  _markers;
  /** Underlying MarkerClusterer object used to interact with Google Maps. */
  markerClusterer;
  ngOnInit() {
    return __async(this, null, function* () {
      if (this._canInitialize) {
        yield this._createCluster();
        this._closestMapEventManager.setTarget(this._googleMap.googleMap);
      }
    });
  }
  ngOnChanges(changes) {
    return __async(this, null, function* () {
      const change = changes["renderer"] || changes["algorithm"];
      if (this.markerClusterer && change && !change.isFirstChange()) {
        yield this._createCluster();
      }
    });
  }
  ngOnDestroy() {
    this._markersSubscription.unsubscribe();
    this._closestMapEventManager.destroy();
    this._destroyCluster();
  }
  _createCluster() {
    return __async(this, null, function* () {
      if (!markerClusterer?.MarkerClusterer && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("MarkerClusterer class not found, cannot construct a marker cluster. Please install the MarkerClusterer library: https://github.com/googlemaps/js-markerclusterer");
      }
      const map2 = yield this._googleMap._resolveMap();
      this._destroyCluster();
      this._ngZone.runOutsideAngular(() => {
        this.markerClusterer = new markerClusterer.MarkerClusterer({
          map: map2,
          renderer: this.renderer,
          algorithm: this.algorithm,
          onClusterClick: (event, cluster, map3) => {
            if (this.clusterClick.observers.length) {
              this._ngZone.run(() => this.clusterClick.emit(cluster));
            } else {
              markerClusterer.defaultOnClusterClickHandler(event, cluster, map3);
            }
          }
        });
        this.markerClustererInitialized.emit(this.markerClusterer);
      });
      yield this._watchForMarkerChanges();
    });
  }
  _watchForMarkerChanges() {
    return __async(this, null, function* () {
      this._assertInitialized();
      const initialMarkers = [];
      const markers = yield this._getInternalMarkers(this._markers.toArray());
      for (const marker of markers) {
        this._currentMarkers.add(marker);
        initialMarkers.push(marker);
      }
      this.markerClusterer.addMarkers(initialMarkers);
      this._markersSubscription.unsubscribe();
      this._markersSubscription = this._markers.changes.subscribe((markerComponents) => __async(this, null, function* () {
        this._assertInitialized();
        const newMarkers = new Set(yield this._getInternalMarkers(markerComponents));
        const markersToAdd = [];
        const markersToRemove = [];
        for (const marker of Array.from(newMarkers)) {
          if (!this._currentMarkers.has(marker)) {
            this._currentMarkers.add(marker);
            markersToAdd.push(marker);
          }
        }
        for (const marker of Array.from(this._currentMarkers)) {
          if (!newMarkers.has(marker)) {
            markersToRemove.push(marker);
          }
        }
        this.markerClusterer.addMarkers(markersToAdd, true);
        this.markerClusterer.removeMarkers(markersToRemove, true);
        this.markerClusterer.render();
        for (const marker of markersToRemove) {
          this._currentMarkers.delete(marker);
        }
      }));
    });
  }
  _destroyCluster() {
    this.markerClusterer?.onRemove();
    this.markerClusterer = void 0;
  }
  _getInternalMarkers(markers) {
    return Promise.all(markers.map((marker) => marker._resolveMarker()));
  }
  _assertInitialized() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._googleMap.googleMap) {
        throw Error("Cannot access Google Map information before the API has been initialized. Please wait for the API to load before trying to interact with it.");
      }
      if (!this.markerClusterer) {
        throw Error("Cannot interact with a MarkerClusterer before it has been initialized. Please wait for the MarkerClusterer to load before trying to interact with it.");
      }
    }
  }
  static ɵfac = function MapMarkerClusterer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapMarkerClusterer)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MapMarkerClusterer,
    selectors: [["map-marker-clusterer"]],
    contentQueries: function MapMarkerClusterer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MAP_MARKER, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._markers = _t);
      }
    },
    inputs: {
      renderer: "renderer",
      algorithm: "algorithm"
    },
    outputs: {
      clusteringbegin: "clusteringbegin",
      clusteringend: "clusteringend",
      clusterClick: "clusterClick",
      markerClustererInitialized: "markerClustererInitialized"
    },
    exportAs: ["mapMarkerClusterer"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MapMarkerClusterer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapMarkerClusterer, [{
    type: Component,
    args: [{
      selector: "map-marker-clusterer",
      exportAs: "mapMarkerClusterer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content/>",
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    renderer: [{
      type: Input
    }],
    algorithm: [{
      type: Input
    }],
    clusteringbegin: [{
      type: Output
    }],
    clusteringend: [{
      type: Output
    }],
    clusterClick: [{
      type: Output
    }],
    markerClustererInitialized: [{
      type: Output
    }],
    _markers: [{
      type: ContentChildren,
      args: [MAP_MARKER, {
        descendants: true
      }]
    }]
  });
})();
var COMPONENTS = [GoogleMap, MapBaseLayer, MapBicyclingLayer, MapCircle, MapDirectionsRenderer, MapGroundOverlay, MapHeatmapLayer, MapInfoWindow, MapKmlLayer, MapMarker, MapAdvancedMarker, DeprecatedMapMarkerClusterer, MapPolygon, MapPolyline, MapRectangle, MapTrafficLayer, MapTransitLayer, MapMarkerClusterer];
var GoogleMapsModule = class _GoogleMapsModule {
  static ɵfac = function GoogleMapsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleMapsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GoogleMapsModule,
    imports: [GoogleMap, MapBaseLayer, MapBicyclingLayer, MapCircle, MapDirectionsRenderer, MapGroundOverlay, MapHeatmapLayer, MapInfoWindow, MapKmlLayer, MapMarker, MapAdvancedMarker, DeprecatedMapMarkerClusterer, MapPolygon, MapPolyline, MapRectangle, MapTrafficLayer, MapTransitLayer, MapMarkerClusterer],
    exports: [GoogleMap, MapBaseLayer, MapBicyclingLayer, MapCircle, MapDirectionsRenderer, MapGroundOverlay, MapHeatmapLayer, MapInfoWindow, MapKmlLayer, MapMarker, MapAdvancedMarker, DeprecatedMapMarkerClusterer, MapPolygon, MapPolyline, MapRectangle, MapTrafficLayer, MapTransitLayer, MapMarkerClusterer]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleMapsModule, [{
    type: NgModule,
    args: [{
      imports: COMPONENTS,
      exports: COMPONENTS
    }]
  }], null, null);
})();
var MapDirectionsService = class _MapDirectionsService {
  _ngZone = inject(NgZone);
  _directionsService;
  constructor() {
  }
  /**
   * See
   * developers.google.com/maps/documentation/javascript/reference/directions
   * #DirectionsService.route
   */
  route(request) {
    return new Observable((observer) => {
      this._getService().then((service) => {
        service.route(request, (result, status) => {
          this._ngZone.run(() => {
            observer.next({
              result: result || void 0,
              status
            });
            observer.complete();
          });
        });
      });
    });
  }
  _getService() {
    if (!this._directionsService) {
      if (google.maps.DirectionsService) {
        this._directionsService = new google.maps.DirectionsService();
      } else {
        return google.maps.importLibrary("routes").then((lib) => {
          this._directionsService = new lib.DirectionsService();
          return this._directionsService;
        });
      }
    }
    return Promise.resolve(this._directionsService);
  }
  static ɵfac = function MapDirectionsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapDirectionsService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MapDirectionsService,
    factory: _MapDirectionsService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapDirectionsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var MapGeocoder = class _MapGeocoder {
  _ngZone = inject(NgZone);
  _geocoder;
  constructor() {
  }
  /**
   * See developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder.geocode
   */
  geocode(request) {
    return new Observable((observer) => {
      this._getGeocoder().then((geocoder) => {
        geocoder.geocode(request, (results, status) => {
          this._ngZone.run(() => {
            observer.next({
              results: results || [],
              status
            });
            observer.complete();
          });
        });
      });
    });
  }
  _getGeocoder() {
    if (!this._geocoder) {
      if (google.maps.Geocoder) {
        this._geocoder = new google.maps.Geocoder();
      } else {
        return google.maps.importLibrary("geocoding").then((lib) => {
          this._geocoder = new lib.Geocoder();
          return this._geocoder;
        });
      }
    }
    return Promise.resolve(this._geocoder);
  }
  static ɵfac = function MapGeocoder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MapGeocoder)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MapGeocoder,
    factory: _MapGeocoder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MapGeocoder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
export {
  DeprecatedMapMarkerClusterer,
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapBaseLayer,
  MapBicyclingLayer,
  MapCircle,
  MapDirectionsRenderer,
  MapDirectionsService,
  MapEventManager,
  MapGeocoder,
  MapGroundOverlay,
  MapHeatmapLayer,
  MapInfoWindow,
  MapKmlLayer,
  MapMarker,
  MapMarkerClusterer,
  MapPolygon,
  MapPolyline,
  MapRectangle,
  MapTrafficLayer,
  MapTransitLayer
};
//# sourceMappingURL=@angular_google-maps.js.map
