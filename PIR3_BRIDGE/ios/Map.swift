//
//  Map.swift
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 12.09.2024.
//

import Foundation
import CoreLocation
import UIKit
import MapKit

@objc(Map)
class Map: RCTEventEmitter, CLLocationManagerDelegate {

    let userDefMap = UserDefaults.standard
    @IBOutlet weak var map: MKMapView!
    @IBOutlet weak var latCoordLabelOnMap: UILabel!
    @IBOutlet weak var lonCoordLabelOnMap: UILabel!

    static var shared: Map?
    
    var locationManager: CLLocationManager?

    override init() {
        super.init()
        self.setupLocationManager()
    }

    required init?(coder: NSCoder) {
        super.init()
        self.setupLocationManager()
    }

    func setupLocationManager() {
        locationManager = CLLocationManager()
        locationManager?.delegate = self
        locationManager?.requestAlwaysAuthorization()
        
        // Запрашиваем разрешение на использование GPS
        locationManager?.requestWhenInUseAuthorization()
        
        // Настраиваем частоту обновления локации
        locationManager?.desiredAccuracy = kCLLocationAccuracyBest
        locationManager?.distanceFilter = 10
        
        // Запускаем отслеживание положения
        locationManager?.startUpdatingLocation()
    }

    override func constantsToExport() -> [AnyHashable : Any] {
        guard let coordinate = locationManager?.location?.coordinate else {
            return ["lat": 0, "lon": 0]
        }
        
      return ["lat": coordinate.latitude, "lon": coordinate.longitude]
    }
  
  @objc
  func getCoords(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    let coordinate = locationManager?.location?.coordinate
    resolve([coordinate?.latitude, coordinate?.longitude])
  }
}
