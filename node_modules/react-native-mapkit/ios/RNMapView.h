#import <React/RCTComponent.h>
#import <React/RCTView.h>

#import <MapKit/MapKit.h>
@import YandexMapsMobile;

@class RCTBridge;

@interface RNMapView: RCTView<YMKUserLocationObjectListener, YMKMapCameraListener, RCTComponent, YMKClusterListener, YMKClusterTapListener>

@property (nonatomic) YMKMapView * _Nullable map;

@end
