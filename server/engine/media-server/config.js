const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: false,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: 8000,
      allow_origin: '*',
      mediaroot: process.env.MEDIA_ROOT || '/home/beatmic/Desktop/VSC/exolive/exolive-server/server/engine/media-server/data',
    },
    relay: {
      ffmpeg: process.env.FFMPEG_PATH || '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'stream',
          mode: 'push',
          edge: 'rtmp://127.0.0.1/hls_1080p',
        },
        {
          app: 'stream',
          mode: 'push',
          edge: 'rtmp://127.0.0.1/hls_720p',
        },
        {
          app: 'stream',
          mode: 'push',
          edge: 'rtmp://127.0.0.1/hls_480p',
        },
        {
          app: 'stream',
          mode: 'push',
          edge: 'rtmp://127.0.0.1/hls_360p',
        },
      ],
    },
    trans: {
      ffmpeg: '/usr/bin/ffmpeg',
      tasks: [
        {
          app: 'hls_1080p',
          hls: true,
          ac: 'aac',
          acParam: ['-b:a', '192k', '-ar', 48000],
          vcParams: [
            '-vf',
            "'scale=1920:-1'",
            '-b:v',
            '5000k',
            '-preset',
            'fast',
            '-g',
            '50',  // GOP ajustado a 2 segundos
            '-profile:v',
            'baseline',
            '-bufsize',
            '7500k'
          ],
          hlsFlags: '[hls_time=1:hls_list_size=5:hls_flags=delete_segments+independent_segments]', // Eliminamos hls_part para verificar el guardado de archivos
        },
        {
          app: 'hls_720p',
          hls: true,
          ac: 'aac',
          acParam: ['-b:a', '128k', '-ar', 48000],
          vcParams: [
            '-vf',
            "'scale=1280:-1'",
            '-b:v',
            '2800k',
            '-preset',
            'fast',
            '-g',
            '50',
            '-profile:v',
            'baseline',
            '-bufsize',
            '4200k'
          ],
          hlsFlags: '[hls_time=1:hls_list_size=5:hls_flags=delete_segments+independent_segments]', // Habilitamos más segmentos en la lista
        },
        {
          app: 'hls_480p',
          hls: true,
          ac: 'aac',
          acParam: ['-b:a', '128k', '-ar', 48000],
          vcParams: [
            '-vf',
            "'scale=854:-1'",
            '-b:v',
            '1400k',
            '-preset',
            'fast',
            '-g',
            '50',
            '-profile:v',
            'baseline',
            '-bufsize',
            '2100k'
          ],
          hlsFlags: '[hls_time=1:hls_list_size=5:hls_flags=delete_segments+independent_segments]',
        },
        {
          app: 'hls_360p',
          hls: true,
          ac: 'aac',
          acParam: ['-b:a', '96k', '-ar', 48000],
          vcParams: [
            '-vf',
            "'scale=480:-1'",
            '-b:v',
            '800k',
            '-preset',
            'fast',
            '-g',
            '50',
            '-profile:v',
            'baseline',
            '-bufsize',
            '1200k'
          ],
          hlsFlags: '[hls_time=1:hls_list_size=5:hls_flags=delete_segments+independent_segments]',
        },
      ],
    },
  };

  module.exports = config;