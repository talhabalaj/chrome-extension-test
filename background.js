// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      if (tab.url.indexOf("tendawifi.com") != -1) {
        chrome.tabs.executeScript(tabId, {
          code: `
          function injectScript(){
            // fix a security issue
            const loginPassword = document.getElementById('login-password');
            if (loginPassword) {
              loginPassword.addEventListener('focus', () => {
                loginPassword.setAttribute('type', 'password');
              })
            }
            
            // Style change 
            const color = 'red';
            document.querySelector('.masthead').style.backgroundColor = color;
            document.querySelector('.active').style.color = color;
            document.querySelector('.nav-lang').style.backgroundColor = color;
            document.querySelectorAll('.nav>li>a:hover, .nav>li>a:focus').forEach(
              (each) => {
                each.style.color = color;
              }
            )

            document.body.style.fontFamily = 'True lies';
            

          }
          window.onload = injectScript();
          `
        });
      }  
    }
  });
});
