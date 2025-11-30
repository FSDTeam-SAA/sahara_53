import React from 'react';

/**
 * Demo component showcasing the primary gradient color system
 * This demonstrates all the different ways to use the gradient
 */
export default function GradientDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-primary-gradient text-5xl font-bold">
            Primary Gradient System
          </h1>
          <p className="text-gray-600">
            Gradient: linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)
          </p>
        </div>

        {/* Gradient Background Examples */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Gradient Backgrounds</h2>
          
          <div className="bg-primary-gradient text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">bg-primary-gradient</h3>
            <p>Full gradient background with white text</p>
          </div>

          <button className="bg-primary-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Gradient Button
          </button>
        </section>

        {/* Gradient Text Examples */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Gradient Text</h2>
          
          <h3 className="text-primary-gradient text-4xl font-bold">
            text-primary-gradient
          </h3>
          
          <p className="text-primary-gradient text-2xl font-semibold">
            Beautiful gradient text effect
          </p>
        </section>

        {/* Gradient Border Examples */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Gradient Borders</h2>
          
          <div className="border-primary-gradient p-6 rounded-lg bg-white">
            <h3 className="text-primary-gradient text-xl font-bold mb-2">
              border-primary-gradient
            </h3>
            <p className="text-gray-600">Card with gradient border</p>
          </div>
        </section>

        {/* Solid Fallback Examples */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Solid Fallback (bg-primary)</h2>
          
          <div className="bg-primary text-primary-foreground p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">bg-primary</h3>
            <p>Uses solid fallback color (#FF7CE5)</p>
          </div>

          <p className="text-primary text-lg font-semibold">
            text-primary (solid color)
          </p>
        </section>

        {/* Custom Gradient Directions */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Custom Gradient Directions</h2>
          
          <div className="bg-gradient-to-r from-primary-start to-primary-end text-white p-6 rounded-lg">
            <p>bg-gradient-to-r from-primary-start to-primary-end</p>
          </div>

          <div className="bg-gradient-to-br from-primary-start to-primary-end text-white p-6 rounded-lg">
            <p>bg-gradient-to-br from-primary-start to-primary-end</p>
          </div>

          <div className="bg-gradient-to-t from-primary-start to-primary-end text-white p-6 rounded-lg">
            <p>bg-gradient-to-t from-primary-start to-primary-end</p>
          </div>
        </section>

        {/* Combined Examples */}
        <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Combined Examples</h2>
          
          <div className="bg-primary-gradient p-8 rounded-2xl">
            <h3 className="text-white text-3xl font-bold mb-4">
              Gradient Background Card
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-primary-gradient font-semibold text-lg">
                Gradient text inside white card
              </p>
              <p className="text-gray-600 mt-2">
                This demonstrates nesting different gradient styles
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
