'use strict';

angular.module('gabor')
    .constant('SOCIAL_URLS', {
        github: "https://github.com/patrickdbakke",
        linkedin: "https://www.linkedin.com/in/patrickdbakke"
    })
    .config(function disableScrolling($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    })
    .config(function(AnalyticsProvider) {
        AnalyticsProvider.setAccount('UA-56509240-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.useAnalytics(true);
        AnalyticsProvider.trackPrefix('gabor');
    });
