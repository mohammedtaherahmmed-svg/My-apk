import { QR_INK, type QrInk } from "@/lib/company";

export type QrDrawOptions = {
  color: QrInk;
  size: number;
  logo: boolean;
  margin?: number;
};

async function loadQr() {
  const mod = await import("qrcode");
  return mod.default;
}

function stampDrop(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = canvas.width;
  const radius = size * 0.11;
  const x = size / 2;
  const y = size / 2;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y, radius + size * 0.018, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#b42318";
  ctx.beginPath();
  ctx.moveTo(x, y - radius * 0.92);
  ctx.bezierCurveTo(
    x + radius * 0.72,
    y - radius * 0.12,
    x + radius * 0.58,
    y + radius * 0.62,
    x,
    y + radius * 0.78,
  );
  ctx.bezierCurveTo(
    x - radius * 0.58,
    y + radius * 0.62,
    x - radius * 0.72,
    y - radius * 0.12,
    x,
    y - radius * 0.92,
  );
  ctx.fill();
}

export async function drawQr(
  canvas: HTMLCanvasElement,
  payload: string,
  options: QrDrawOptions,
): Promise<void> {
  const QRCode = await loadQr();
  await QRCode.toCanvas(canvas, payload, {
    errorCorrectionLevel: options.logo ? "H" : "M",
    margin: options.margin ?? 2,
    width: options.size,
    color: { dark: QR_INK[options.color], light: "#ffffff" },
  });
  if (options.logo) stampDrop(canvas);
}

export async function qrPngDataUrl(
  payload: string,
  options: QrDrawOptions,
): Promise<string> {
  const canvas = document.createElement("canvas");
  await drawQr(canvas, payload, options);
  return canvas.toDataURL("image/png");
}

export async function qrSvgString(payload: string, color: QrInk): Promise<string> {
  const QRCode = await loadQr();
  return QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: QR_INK[color], light: "#ffffff" },
  });
}
