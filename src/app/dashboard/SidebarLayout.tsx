'use client';

import React from 'react';
import { Box, Typography, Divider, Link as MuiLink } from '@mui/material';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import NextLink from 'next/link';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* Barra superior azul */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#1976d2', // Azul Material UI
          color: '#fff',
          padding: '0.75rem 1rem',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Panel de Inicio
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Barra lateral (blanca) */}
        <Box
          sx={{
            width: 240,
            backgroundColor: '#fff',
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          {/* Título o branding */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Let&apos;s Help
          </Typography>

          {/* Menú lateral */}
          <Box sx={{ flexGrow: 1 }}>
            <SidebarLink href="/dashboard" label="Inicio" />
            <SidebarLink href="/dashboard/profile" label="Perfil" />
          </Box>

          {/* Selector de idioma */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Idioma:</Typography>
            <LanguageSwitcher />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Salir */}
          <Box>
            <Typography
              variant="body1"
              sx={{ color: 'red', cursor: 'pointer' }}
              // onClick={() => {/* lógica de logout */}}
            >
              Salir
            </Typography>
          </Box>
        </Box>

        {/* Contenido (fondo gris claro) */}
        <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

// Pequeño helper para los enlaces del sidebar
function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <MuiLink
      component={NextLink}
      href={href}
      variant="body1"
      underline="none"
      sx={{
        display: 'block',
        color: 'inherit',
        py: 1,
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {label}
    </MuiLink>
  );
}
