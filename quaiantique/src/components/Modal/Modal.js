import React from 'react';
import s from './style.module.css';

export default function Modal() {
  return (
    <div className={s.modal}>
      <div className={s.modal_content}>
        <h2>Bienvenue sur notre plateforme !</h2>
        <p>Merci de vous être inscrit. Vous pouvez maintenant profiter de nos services.</p>
      </div>
    </div>
  );
};


