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

    vm.portfolio = localStorage.getItem('xcc.portfolio');
    vm.linkedin = localStorage.getItem('xcc.linkedin');

    vm.contactForm = {};
    vm.search = search;
    vm.stepCompleted = stepCompleted;
    vm.submitContactForm = submitContactForm;

    activate();

    function activate() {
      var storedSteps = localStorage.getItem('xcc.completedSteps');
      if (storedSteps) {
        storedSteps = JSON.parse(storedSteps);

        vm.steps = angular.extend(vm.steps, storedSteps);
      }

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

      if (name === 'portfolio') {
        localStorage.setItem('xcc.portfolio', vm.portfolio);
      } else if (name === 'linkedin') {
        localStorage.setItem('xcc.linkedin', vm.linkedin);
      }

      if (name !== 'github' || !step.completedOn) {
        $('#step-' + name + '-success-message').show(500);
        setTimeout(function() {
          $('#step-' + name + '-success-message').hide(500);
        }, 3000);
      }

      if (!step.completedOn) {
        step.completedOn = new Date();

        localStorage.setItem('xcc.completedSteps', JSON.stringify(vm.steps));

        return true;
      }
      return false;
    }

    function submitContactForm() {
      $('#contact-submitted').show(500);
      setTimeout(function() {
        $('#contact-submitted').hide(500);
      }, 3000);
      vm.contactForm = {};
    }

    Dropzone.options.resumeDropzone = {
      autoProcessQueue: false,
      dictDefaultMessage: 'Click or drag and drop files here to upload',
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

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})