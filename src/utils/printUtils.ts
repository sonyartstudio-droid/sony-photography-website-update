/**
 * Universal Print & Export Utility for Sony Photography Sirhind
 * Handles robust printing inside iframes, standalone tabs, and PDF export
 */

export const triggerPrintDocument = (elementId: string, title: string = 'Document') => {
  try {
    // 1. Try standard window.print first
    const el = document.getElementById(elementId);
    if (!el) {
      window.print();
      return;
    }

    // 2. Also try creating a clean, isolated print iframe or window if running in nested contexts
    const content = el.outerHTML;
    const printWindow = window.open('', '_blank', 'width=850,height=900');

    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${title} - Sony Photography Sirhind</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
              @page {
                size: A4 portrait;
                margin: 10mm;
              }
              body {
                font-family: 'Plus Jakarta Sans', sans-serif;
                background-color: #ffffff;
                color: #2D241E;
                margin: 0;
                padding: 10px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .font-serif {
                font-family: 'Playfair Display', serif;
              }
              .font-cinzel {
                font-family: 'Cinzel', serif;
              }
              @media print {
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${content}
            </div>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.focus();
                  window.print();
                }, 400);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Fallback directly to window.print if popup was blocked
      window.print();
    }
  } catch (err) {
    console.warn('Dedicated print window error, falling back to window.print():', err);
    window.print();
  }
};

export const downloadDocumentContent = (elementId: string, filename: string = 'document.html') => {
  const el = document.getElementById(elementId);
  if (!el) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${filename} - Sony Photography Sirhind</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page { size: A4 portrait; margin: 10mm; }
          body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; padding: 20px; }
          .font-serif { font-family: 'Playfair Display', serif; }
        </style>
      </head>
      <body>
        ${el.outerHTML}
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
