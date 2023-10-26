#import "RNMapView.h"

@implementation RNMapView

- (instancetype)init {
  self = [super init];
  _map = [[YMKMapView alloc] initWithFrame:self.bounds];
  _map.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

  [self addSubview:_map];

  return self;
}

+ (BOOL)requiresMainQueueSetup
 {
     return YES;
 }

@synthesize reactTag;

@synthesize rootTag;

@end
