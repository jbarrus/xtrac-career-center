angular.module('profileApp', [])
  .controller('ProfileController', function($scope) {
    var vm = this;

    vm.steps = {
      github: {name: 'Connect Github Account', completedOn: null},
      resume: {name: 'Upload your Resume', completedOn: null},
      portfolio: {name: 'Link to your Portfolio', completedOn: null},
      linkedin: {name: 'LinkedIn Profile', completedOn: null}
    };
    vm.profile = null;

    vm.stepCompleted = stepCompleted;

    activate();

    function activate() {
      vm.profile = localStorage.getItem('xcc.profile');
      if (vm.profile) {
        vm.profile = JSON.parse(vm.profile);

        stepCompleted('github');
      }
    }

    function stepCompleted(name) {
      var step = vm.steps[name];

      if (!step.completedOn) {
        step.completedOn = new Date();

        $('#step-' + name + '-success-message').show(500);
        setTimeout(function() {
          $('#step-' + name + '-success-message').hide(500);
        }, 3000);

        return true;
      }
      return false;
    }

    Dropzone.options.resumeDropzone = {
      autoProcessQueue: false,
      init: function() {
        this.on("addedfile", function(file) {
          $scope.$apply(function() {
            stepCompleted('resume');
          });

          $('#resume-upload-message').show(500);
          setTimeout(function() {
            $('#resume-upload-message').hide(500);
          }, 3000);
        });
      }
    };
  });