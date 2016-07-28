angular.module('profileApp', [])
  .constant('toastr', window.toastr)
  .config(function(toastr) {
    toastr.options.positionClass = 'toast-top-center';
  })
  .controller('ProfileController', function($scope, toastr) {
    var vm = this;

    vm.steps = {
      github: {name: 'Connect Github Account', completedOn: null},
      resume: {name: 'Upload your Resume', completedOn: null},
      portfolio: {name: 'Link to your Portfolio', completedOn: null},
      linkedin: {name: 'LinkedIn Profile', completedOn: null}
    };
    vm.profile = null;

    vm.contactForm = {};
    vm.search = search;
    vm.stepCompleted = stepCompleted;
    vm.submitContactForm = submitContactForm;

    activate();

    function activate() {
      vm.profile = localStorage.getItem('xcc.profile');
      if (vm.profile) {
        vm.profile = JSON.parse(vm.profile);

        stepCompleted('github');
      }
    }

    function search() {
      console.log('search');
      toastr.info('coming soon');
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

    function submitContactForm() {
      toastr.success('Thanks for contacting us ' + vm.contactForm.first + ', we will get back to you soon!')
      vm.contactForm = {};
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