// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const color = "#35434d !important";
const secondaryColor = "#2a2a2a !important";

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
              });
            }
          }
          window.onload = injectScript();
          `
        });
        chrome.tabs.insertCSS(tabId, {
          code:`
          body {
            font-family: 'SF UI Text', sans-serif !important;
          }
          .nav-lang {
            background-color: ${color};
          }
          .masthead {
            background-color: ${color};
          }
          .active {
            color: ${color};
          }
          .nav>li>a:hover, .nav>li>a:focus {
            color: ${color};
          }
          #statistic fieldset:hover {
            border-color: ${color};
          }
          .table>thead>tr>th {
            color: ${color};
          }
          .text-primary {
            color: ${color};
          }
          .text-warning {
            color: ${color};
          }
          .btn-primary {
            background-color: ${color};
            border-color: ${color};
          }

          `
        }); 
      }
    }
  });
});
