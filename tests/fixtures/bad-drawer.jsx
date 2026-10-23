import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function BadDrawer({ isOpen }) {
  return (
    <div className="drawer-container transition-all">
      {/* Violates ML001: Animating layout property 'height' on main thread */}
      <motion.div
        animate={{ height: isOpen ? 320 : 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <p>This layout animation triggers reflow on every single frame.</p>
      </motion.div>
    </div>
  );
}
