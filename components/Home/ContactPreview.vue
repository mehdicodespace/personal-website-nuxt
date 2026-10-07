<template>
  <section class="relative pt-0 pb-16">
    <div class="px-8 sm:px-12 xl:px-20 mx-auto">
      <div class="bg-gradient-to-r from-main-orange/10 to-main-green/10 rounded-2xl p-8 md:p-12 border border-main-orange/20">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-4"><span class="text-main-orange">Let's</span> Connect</h2>
          <p class="text-white/70 text-lg">Ready to start your next project? Let's discuss how I can help bring your vision to life.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="text-center">
            <div class="w-12 h-12 bg-main-orange/20 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-main-orange"><IconMail /></svg></div>
            <p class="text-white font-medium">Email Me</p>
            <p class="text-white/70 text-sm">contact@mehdispace.com</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-main-orange/20 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-main-orange"><IconClock /></svg></div>
            <p class="text-white font-medium">Response Time</p>
            <p class="text-white/70 text-sm">Within 24 hours</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-main-orange/20 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-main-orange"><IconGlobe /></svg></div>
            <p class="text-white font-medium">Availability</p>
            <p class="text-white/70 text-sm">Open to new projects</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <NuxtLink to="/contact-me" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-main-orange text-white rounded-lg hover:bg-main-orange/80 transition-colors duration-200 font-semibold">
            <span>Get In Touch</span><svg class="w-5 h-5"><IconArrow /></svg>
          </NuxtLink>
          <a href="/Mehdi-Rafiei-Resume.pdf" download="Mehdi Rafiei Resume.pdf" class="inline-flex items-center justify-center gap-2 px-8 py-4 border border-main-orange text-main-orange rounded-lg hover:bg-main-orange hover:text-white transition-colors duration-200 font-semibold">
            <svg class="w-5 h-5"><IconPdf /></svg><span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
