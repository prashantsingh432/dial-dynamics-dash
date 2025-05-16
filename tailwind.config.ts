
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Dashboard specific colors - enhanced with additional shades
                dashboard: {
                    blue: '#1D4ED8',
                    lightBlue: '#3B82F6',
                    brightBlue: '#60A5FA',
                    paleBlue: '#EFF6FF',
                    green: '#10B981',
                    lightGreen: '#A7F3D0',
                    amber: '#F59E0B',
                    lightAmber: '#FDE68A',
                    red: '#EF4444',
                    lightRed: '#FECACA',
                    background: '#F9FAFB',
                    surface: '#FFFFFF',
                    text: '#1F2937',
                    textSecondary: '#6B7280'
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                // Dashboard animations - enhanced with improved timings and effects
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(10px)' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'scale-out': {
                    from: { transform: 'scale(1)', opacity: '1' },
                    to: { transform: 'scale(0.95)', opacity: '0' }
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'slide-out-right': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                'counter': {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-100%)' },
                    '50.01%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                'pulse': {
                    '0%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '1' }
                },
                'float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-5px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                // Dashboard animations
                'fade-in': 'fade-in 0.4s ease-out',
                'fade-out': 'fade-out 0.4s ease-out',
                'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-out': 'scale-out 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-right': 'slide-in-right 0.4s ease-out',
                'slide-out-right': 'slide-out-right 0.4s ease-out',
                'enter': 'fade-in 0.4s ease-out, scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'exit': 'fade-out 0.4s ease-out, scale-out 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'counter': 'counter 0.5s ease-out',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite linear'
			},
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'poppins': ['Poppins', 'sans-serif'],
            },
            scale: {
                '102': '1.02',
            },
            boxShadow: {
                'card': '0px 4px 12px rgba(0, 0, 0, 0.05)',
                'card-hover': '0px 8px 24px rgba(0, 0, 0, 0.08)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
