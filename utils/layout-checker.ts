export function checkLayout() {
  const overflowingElements = Array.from(document.querySelectorAll('*')).filter(
    (el) => el.scrollWidth > el.clientWidth
  );

  if (overflowingElements.length > 0) {
    console.warn('Overflowing elements detected:', overflowingElements);
  }

  const misalignedElements = Array.from(document.querySelectorAll('.grid, .flex')).filter(
    (el) => {
      const children = Array.from(el.children);
      const firstChildTop = children[0].getBoundingClientRect().top;
      return children.some((child) => child.getBoundingClientRect().top !== firstChildTop);
    }
  );

  if (misalignedElements.length > 0) {
    console.warn('Misaligned elements detected:', misalignedElements);
  }

  const nonFunctionalButtons = Array.from(document.querySelectorAll('button')).filter(
    (button) => !button.onclick && !button.getAttribute('type')
  );

  if (nonFunctionalButtons.length > 0) {
    console.warn('Potentially non-functional buttons detected:', nonFunctionalButtons);
  }
}

