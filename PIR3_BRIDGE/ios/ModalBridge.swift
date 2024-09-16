//
//  ModalBridge.swift
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 16.09.2024.
//

import Foundation
import UIKit

class ModalContentViewController: UIViewController {
  private var textView: UITextView!
  
  init(text: String) {
      self.textView = UITextView()
      super.init(nibName: nil, bundle: nil)
      self.textView.text = text
  }
  
  required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
    override func viewDidLoad() {
        super.viewDidLoad()
        
      view.backgroundColor =  .cyan
        view.layer.cornerRadius = 15
      
        
      textView.font = UIFont.systemFont(ofSize: 17)
      textView.backgroundColor = .cyan
      textView.layer.cornerRadius = 8
      textView.translatesAutoresizingMaskIntoConstraints = false
              
      view.addSubview(textView)
              
      NSLayoutConstraint.activate([
          textView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
          textView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
          textView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
          textView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
}


@objc(ModalWindow)
class ModalWindow: NSObject {
    static let shared = ModalWindow()
    
    private var window: UIWindow?
  
  private var callback: RCTResponseSenderBlock?
  
  func setCallback(_ callback: @escaping RCTResponseSenderBlock) {
      self.callback = callback
  }
  
  @objc(showModal:text:callback:)
  func showModal(_ name:String, text: String, callback: @escaping RCTResponseSenderBlock) {
    setCallback(callback)
    DispatchQueue.main.async {
        
        let modalContent = ModalContentViewController(text: text)
        
        self.window = UIWindow(frame: CGRect(x: 50, y: 150, width: 300, height: 400))
        self.window?.rootViewController = UINavigationController(rootViewController: modalContent)
        self.window?.windowLevel = .alert + 1
        self.window?.makeKeyAndVisible()
        
      
        let closeButton = UIButton(type: .system)
        closeButton.setTitle("Закрыть", for: .normal)
        closeButton.addTarget(self, action: #selector(self.hideModal), for: .touchUpInside)
        closeButton.frame = CGRect(x: 10, y: 10, width: 100, height: 30)
        
        let okButton = UIButton(type: .system)
        okButton.setTitle("ОК", for: .normal)
        okButton.addTarget(self, action: #selector(self.handleOkButton), for: .touchUpInside)
        okButton.frame = CGRect(x: 60, y: 350, width: 100, height: 50)
        
        let cancelButton = UIButton(type: .system)
        cancelButton.setTitle("Отмена", for: .normal)
        cancelButton.addTarget(self, action: #selector(self.handleCancelButton), for: .touchUpInside)
        cancelButton.frame = CGRect(x: 160, y: 350, width: 100, height: 50)
        
      
        self.window?.addSubview(closeButton)
        self.window?.addSubview(okButton)
        self.window?.addSubview(cancelButton)
      }
    }
    
  @objc func handleOkButton() {
    guard let callback = self.callback else {
        print("увы")
        self.hideModal()
        return
    }
    callback(["ok"])
    self.hideModal()
  }
  
  @objc func handleCancelButton() {
    guard let callback = self.callback else {
        print("увы")
        self.hideModal()
        return
    }
    callback(["cansel"])
    self.hideModal()
  }
  

  
  @objc
    func hideModal() {
      DispatchQueue.main.async {
        self.window?.removeFromSuperview()
        self.window = nil
      }
    }
  
}
