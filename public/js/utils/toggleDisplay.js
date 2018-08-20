const toggleDisplay = (element, condition, opacity = 1) => {
  const newStyle = condition ? 'block' : 'none';
  if (element.style.display !== newStyle) {
    if (newStyle === 'block') {
      element.style.display = newStyle;
      setTimeout(() => element.style.opacity = opacity, 250);
    } else {
      element.style.opacity = 0;
      setTimeout(() => element.style.display = newStyle, 250);
    }
  }
};