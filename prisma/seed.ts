import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create companies first
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'TechnoPark Indonesia',
        industry: 'Technology Park Management',
        website: 'https://technopark.id',
        description: 'Kawasan teknologi terpadu dengan berbagai tenant startup dan industri manufaktur.',
        logo: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=TP'
      }
    }),
    prisma.company.create({
      data: {
        name: 'PT Indotech',
        industry: 'Manufacturing',
        website: 'https://indotech.co.id',
        description: 'Perusahaan manufaktur dengan fokus pada sistem otomasi dan IoT.',
        logo: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=ID'
      }
    }),
    prisma.company.create({
      data: {
        name: 'Bank Syariah Indonesia',
        industry: 'Banking',
        website: 'https://bankbsi.co.id',
        description: 'Bank syariah terbesar di Indonesia dengan layanan perbankan digital.',
        logo: 'https://via.placeholder.com/150x150/059669/FFFFFF?text=BSI'
      }
    }),
    prisma.company.create({
      data: {
        name: 'Tokopedia',
        industry: 'E-commerce',
        website: 'https://tokopedia.com',
        description: 'Platform e-commerce terkemuka di Indonesia.',
        logo: 'https://via.placeholder.com/150x150/DC2626/FFFFFF?text=TP'
      }
    }),
    prisma.company.create({
      data: {
        name: 'Telkom Indonesia',
        industry: 'Telecommunications',
        website: 'https://telkom.co.id',
        description: 'Perusahaan telekomunikasi terbesar di Indonesia.',
        logo: 'https://via.placeholder.com/150x150/1E40AF/FFFFFF?text=TL'
      }
    }),
    prisma.company.create({
      data: {
        name: 'Gojek',
        industry: 'Super App',
        website: 'https://gojek.com',
        description: 'Platform super app untuk berbagai layanan on-demand.',
        logo: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=GJ'
      }
    })
  ])

  // Create projects
  const projects = [
    {
      companyId: companies[0].id,
      name: 'TechnoPark Automation System',
      slug: 'technopark-automation-system',
      type: 'development',
      visibility: 'public',
      status: 'completed',
      summary: 'Sistem terintegrasi dengan uptime zero downtime 24/7 yang digunakan oleh lebih dari 1.000 karyawan dari 15 perusahaan tenant di area TechnoPark dengan 2 vendor shuttle bus dan 2 vendor catering. Menyediakan dashboard realtime order, realtime vendor schedule, dan rekapitulasi tagihan pembayaran.',
      impact: {
        scale: 'high',
        users: '>600 users',
        companies: '15 company',
        manualWorkReduction: '+- 120 jam / bulan',
        supportOperationalCashflow: '>1 milyar/bulan'
      },
      modules: [
        {
          id: 'shuttle-bus',
          name: 'Shuttle Bus System',
          summary: 'Manajemen transportasi jemputan karyawan yang menghandle 4 shift kerja (regular dan overtime), 11 route regular, 8 route gabungan overtime, 70 pickup point, 2 vendor shuttle, 35 driver, 27 kendaraan, 15 perusahaan tenant, dan 590 karyawan.',
          challenges: [
            {
              problem: 'Manual job memakan waktu >2 jam/hari untuk membuat SPK (Surat Perintah Kerja) dan distribusi karyawan, route, dan bus.',
              solution: 'Menerapkan sistem auto-schedule berbasis route optimization dengan dashboard monitoring.'
            },
            {
              problem: 'Manual job mengandalkan email dan whatsapp untuk menerima informasi dari tenant maupun vendor, sehingga pencatatan order tidak transparant.',
              solution: 'Menerapkan sistem auto-schedule berbasis route optimization dengan dashboard monitoring.'
            },
            {
              problem: 'Ketidaktepatan occupancy bus dengan total passenger, sehingga seringkali bus overload atau terlalu sedikit.',
              solution: 'Menetapkan rule ke masing-masing vendor dan karyawan untuk mengikuti output dari sistem, karena distribusi lebih merata.'
            },
            {
              problem: 'Proses rekapitulasi manual tagihan order antara vendor, tenant, dan techno park banyak revisi dan memakan waktu >2 hari',
              solution: 'Membangun report system yang dapat di print dan dilihat dari basis data yang sama antara techno park, vendor, dan tenant'
            },
            {
              problem: 'Implementasi system ke tingkat user PIC tenant, karyawan, driver, dan vendor lambat.',
              solution: 'Training secara berkala, panduan yang singkat dan jelas, melakukan visit satu-persatu, dan public trial sebelum go-live'
            }
          ]
        },
        {
          id: 'catering',
          name: 'Catering System',
          summary: 'Manajemen catering karyawan yang menghandle 3 shift kerja (regular dan overtime), 3 canteen, 2 vendor catering, 15 perusahaan tenant, dan 1024 karyawan',
          challenges: [
            {
              problem: 'Pemesanan manual menyebabkan keterlambatan dan ketidak akuratan order makanan.',
              solution: 'Membangun sistem preorder berbasis web dengan cut-off time otomatis dan realtime order yang terhubung langsung dengan vendor.'
            },
            {
              problem: 'Proses rekapitulasi manual tagihan order antara vendor, tenant, dan techno park banyak revisi dan memakan waktu >2 hari',
              solution: 'Membangun report system yang dapat di print dan dilihat dari basis data yang sama antara techno park, vendor, dan tenant'
            }
          ]
        }
      ],
      stack: {
        frontend: ['Next.js', 'Mantine UI'],
        backend: ['Node.js', 'Prisma', 'JWT'],
        database: ['MySQL'],
        deployment: ['Linux Ubuntu', 'Plesk']
      },
      attachments: [
        {
          type: 'image',
          title: 'Dashboard Overview',
          url: 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+Overview',
          description: 'Tampilan dashboard utama sistem automasi.'
        }
      ]
    },
    {
      companyId: companies[1].id,
      name: 'Smart Factory IoT Platform',
      slug: 'smart-factory-iot-platform',
      type: 'IoT Platform',
      visibility: 'public',
      status: 'in-progress',
      summary: 'Platform IoT untuk monitoring dan kontrol produksi pabrik secara real-time dengan integrasi sensor dan machine learning.',
      impact: {
        efficiency: '+35% production efficiency',
        downtime: '-60% downtime',
        quality: '+25% product quality',
        cost: '-20% operational cost'
      },
      modules: [
        {
          id: 'sensor-network',
          name: 'Sensor Network Management',
          summary: 'Manajemen jaringan sensor untuk monitoring suhu, tekanan, kelembaban, dan getaran mesin produksi.',
          challenges: [
            {
              problem: 'Keterbatasan jangkauan wireless sensor di area pabrik yang luas.',
              solution: 'Implementasi mesh network dengan gateway redundancy untuk coverage optimal.'
            },
            {
              problem: 'Data loss akibat interferensi frekuensi industri.',
              solution: 'Penggunaan frequency hopping dan data compression protocols.'
            }
          ]
        },
        {
          id: 'predictive-maintenance',
          name: 'Predictive Maintenance',
          summary: 'Sistem prediksi maintenance berbasis machine learning untuk mencegah breakdown equipment.',
          challenges: [
            {
              problem: 'Kurangnya data historis untuk training model ML.',
              solution: 'Implementasi synthetic data generation dan transfer learning dari industry datasets.'
            },
            {
              problem: 'Integration dengan legacy SCADA systems.',
              solution: 'Development custom protocol adapters dan middleware layer.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['React', 'Chart.js', 'Material-UI'],
        backend: ['Python', 'FastAPI', 'TensorFlow', 'Apache Kafka'],
        database: ['InfluxDB', 'PostgreSQL', 'Redis'],
        deployment: ['Docker', 'Kubernetes', 'AWS IoT Core']
      },
      attachments: [
        {
          type: 'image',
          title: 'Factory Dashboard',
          url: 'https://via.placeholder.com/800x400/10B981/FFFFFF?text=Factory+Dashboard',
          description: 'Real-time factory monitoring dashboard.'
        }
      ]
    },
    {
      companyId: companies[2].id,
      name: 'Mobile Banking BSI',
      slug: 'mobile-banking-bsi',
      type: 'Mobile Application',
      visibility: 'public',
      status: 'completed',
      summary: 'Aplikasi mobile banking syariah dengan fitur lengkap untuk transaksi keuangan sesuai prinsip syariah.',
      impact: {
        users: '5M+ active users',
        transactions: '10M+ transactions/month',
        satisfaction: '4.7/5 rating',
        adoption: '+200% growth'
      },
      modules: [
        {
          id: 'wallet-syariah',
          name: 'E-Wallet Syariah',
          summary: 'Digital wallet dengan fitur zakat, infaq, dan wakaf otomatis.',
          challenges: [
            {
              problem: 'Integrasi dengan berbagai lembaga zakat dan wakaf.',
              solution: 'API standardization dan real-time settlement system.'
            },
            {
              problem: 'Compliance dengan regulasi MUI dan OJK.',
              solution: 'Regular audit dan Sharia compliance framework.'
            }
          ]
        },
        {
          id: 'qardhul-hasan',
          name: 'Qardhul Hasan Financing',
          summary: 'Platform pinjaman tanpa bunga untuk UMKM dengan social scoring.',
          challenges: [
            {
              problem: 'Risk assessment untuk borrower tanpa credit history.',
              solution: 'Alternative data scoring menggunakan social dan transaction data.'
            },
            {
              problem: 'Collection process yang sesuai syariah.',
              solution: 'Digital reminder system dengan Islamic ethics guidelines.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['React Native', 'TypeScript', 'Redux'],
        backend: ['Java Spring Boot', 'Microservices', 'Apache Camel'],
        database: ['Oracle', 'MongoDB', 'Redis'],
        deployment: ['OpenShift', 'Jenkins', 'New Relic']
      },
      attachments: [
        {
          type: 'image',
          title: 'Mobile App Screens',
          url: 'https://via.placeholder.com/800x400/059669/FFFFFF?text=BSI+Mobile',
          description: 'Tampilan aplikasi mobile banking BSI.'
        }
      ]
    },
    {
      companyId: companies[3].id,
      name: 'Tokopedia Supply Chain',
      slug: 'tokopedia-supply-chain',
      type: 'Logistics Platform',
      visibility: 'private',
      status: 'in-progress',
      summary: 'Platform supply chain management untuk mengoptimalkan alur barang dari seller ke buyer.',
      impact: {
        delivery: '-40% delivery time',
        cost: '-25% logistics cost',
        efficiency: '+50% warehouse efficiency',
        coverage: '500+ cities'
      },
      modules: [
        {
          id: 'warehouse-automation',
          name: 'Warehouse Automation',
          summary: 'Sistem otomasi gudang dengan robot dan AI untuk optimalisasi storage.',
          challenges: [
            {
              problem: 'Integration dengan existing warehouse infrastructure.',
              solution: 'Phased rollout dengan hybrid automation approach.'
            },
            {
              problem: 'High cost of automation equipment.',
              solution: 'ROI-based implementation dengan priority matrix.'
            }
          ]
        },
        {
          id: 'last-mile-optimization',
          name: 'Last Mile Optimization',
          summary: 'Route optimization untuk delivery agents dengan real-time traffic data.',
          challenges: [
            {
              problem: 'Dynamic traffic conditions di urban areas.',
              solution: 'Machine learning models dengan real-time data feeds.'
            },
            {
              problem: 'Multiple delivery constraints (time windows, vehicle capacity).',
              solution: 'Advanced optimization algorithms dengan constraint programming.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        backend: ['Go', 'gRPC', 'Apache Pulsar'],
        database: ['Cassandra', 'Elasticsearch', 'PostgreSQL'],
        deployment: ['Google Cloud Platform', 'Kubernetes', 'Terraform']
      },
      attachments: [
        {
          type: 'image',
          title: 'Supply Chain Dashboard',
          url: 'https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Supply+Chain',
          description: 'Real-time supply chain monitoring dashboard.'
        }
      ]
    },
    {
      companyId: companies[4].id,
      name: '5G Network Management',
      slug: '5g-network-management',
      type: 'Network Infrastructure',
      visibility: 'private',
      status: 'planning',
      summary: 'Platform manajemen jaringan 5G dengan AI-driven optimization untuk coverage dan capacity.',
      impact: {
        coverage: '95% population coverage',
        latency: '<10ms latency',
        capacity: '10Gbps peak speed',
        reliability: '99.999% uptime'
      },
      modules: [
        {
          id: 'network-slicing',
          name: 'Network Slicing',
          summary: 'Virtual network slices untuk berbagai use cases (IoT, AR/VR, Critical Communications).',
          challenges: [
            {
              problem: 'Resource allocation antar slices dengan SLA berbeda.',
              solution: 'Dynamic resource allocation dengan reinforcement learning.'
            },
            {
              problem: 'Inter-slice interference management.',
              solution: 'Advanced isolation techniques dengan spectrum sharing.'
            }
          ]
        },
        {
          id: 'self-optimizing-network',
          name: 'Self-Optimizing Network (SON)',
          summary: 'Sistem AI untuk otomatisasi network configuration dan troubleshooting.',
          challenges: [
            {
              problem: 'Complex network topology dengan thousands of parameters.',
              solution: 'Graph neural networks untuk topology optimization.'
            },
            {
              problem: 'Real-time decision making untuk network adjustments.',
              solution: 'Edge AI deployment dengan federated learning.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['Angular', 'D3.js', 'Cesium'],
        backend: ['Python', 'Apache Spark', 'TensorFlow Extended'],
        database: ['TimescaleDB', 'Neo4j', 'Apache Druid'],
        deployment: ['OpenStack', 'Kubernetes', 'Prometheus']
      },
      attachments: [
        {
          type: 'image',
          title: '5G Network Map',
          url: 'https://via.placeholder.com/800x400/1E40AF/FFFFFF?text=5G+Network',
          description: 'Interactive 5G network coverage map.'
        }
      ]
    },
    {
      companyId: companies[5].id,
      name: 'GoFood Merchant Platform',
      slug: 'gofood-merchant-platform',
      type: 'Merchant Platform',
      visibility: 'public',
      status: 'completed',
      summary: 'Platform komprehensif untuk merchant restaurant management dengan analytics dan marketing tools.',
      impact: {
        merchants: '500K+ active merchants',
        orders: '2M+ orders/day',
        revenue: '+60% merchant revenue',
        retention: '+40% customer retention'
      },
      modules: [
        {
          id: 'inventory-management',
          name: 'Inventory Management',
          summary: 'Real-time inventory tracking dengan prediction untuk stock optimization.',
          challenges: [
            {
              problem: 'Perishable goods management dengan expiry tracking.',
              solution: 'FIFO-based system dengan automated alerts.'
            },
            {
              problem: 'Multi-location inventory synchronization.',
              solution: 'Distributed inventory management dengan real-time sync.'
            }
          ]
        },
        {
          id: 'dynamic-pricing',
          name: 'Dynamic Pricing Engine',
          summary: 'AI-powered pricing optimization berbasis demand, competition, dan time.',
          challenges: [
            {
              problem: 'Real-time price adjustment tanpa confusing customers.',
              solution: 'Gradual price changes dengan transparent pricing policies.'
            },
            {
              problem: 'Compliance dengan price regulation.',
              solution: 'Regulatory compliance layer dengan audit trails.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['React', 'TypeScript', 'Ant Design'],
        backend: ['Node.js', 'NestJS', 'Apache Kafka'],
        database: ['PostgreSQL', 'MongoDB', 'Redis'],
        deployment: ['AWS', 'Docker', 'CircleCI']
      },
      attachments: [
        {
          type: 'image',
          title: 'Merchant Dashboard',
          url: 'https://via.placeholder.com/800x400/10B981/FFFFFF?text=Merchant+Dashboard',
          description: 'Analytics dashboard untuk GoFood merchants.'
        }
      ]
    },
    {
      companyId: companies[0].id,
      name: 'Digital Parking System',
      slug: 'digital-parking-system',
      type: 'Smart City',
      visibility: 'public',
      status: 'completed',
      summary: 'Sistem parkir digital dengan license plate recognition dan mobile payment integration.',
      impact: {
        efficiency: '+80% parking efficiency',
        revenue: '+120% parking revenue',
        time: '-60% parking time',
        satisfaction: '4.5/5 user rating'
      },
      modules: [
        {
          id: 'lpr-system',
          name: 'License Plate Recognition',
          summary: 'AI-powered LPR untuk automated vehicle identification.',
          challenges: [
            {
              problem: 'Various license plate formats dan lighting conditions.',
              solution: 'Multi-model CNN ensemble dengan data augmentation.'
            },
            {
              problem: 'Real-time processing requirements.',
              solution: 'Edge computing dengan optimized inference models.'
            }
          ]
        },
        {
          id: 'mobile-payment',
          name: 'Mobile Payment Integration',
          summary: 'Integration dengan berbagai e-wallet dan banking apps.',
          challenges: [
            {
              problem: 'Multiple payment gateway integration.',
              solution: 'Unified payment API dengan standardized protocols.'
            },
            {
              problem: 'Transaction security dan fraud prevention.',
              solution: 'Multi-layer security dengan encryption dan anomaly detection.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['React Native', 'TypeScript', 'Redux'],
        backend: ['Python', 'Django', 'OpenCV', 'TensorFlow'],
        database: ['PostgreSQL', 'Redis', 'InfluxDB'],
        deployment: ['AWS', 'Docker', 'Nginx']
      },
      attachments: [
        {
          type: 'image',
          title: 'Parking Management',
          url: 'https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Parking+System',
          description: 'Digital parking management interface.'
        }
      ]
    },
    {
      companyId: companies[2].id,
      name: 'BSI Agen Banking',
      slug: 'bsi-agen-banking',
      type: 'Agent Banking',
      visibility: 'public',
      status: 'in-progress',
      summary: 'Platform agent banking untuk layanan perbankan di area rural dengan mobile agents.',
      impact: {
        outreach: '10K+ villages reached',
        financial: '500K+ unbanked population served',
        transactions: '1M+ agent transactions/month',
        inclusion: '+200% financial inclusion'
      },
      modules: [
        {
          id: 'mobile-agent',
          name: 'Mobile Agent App',
          summary: 'Aplikasi mobile untuk agents dengan offline capabilities.',
          challenges: [
            {
              problem: 'Limited internet connectivity di rural areas.',
              solution: 'Offline-first architecture dengan sync when online.'
            },
            {
              problem: 'Security di mobile devices.',
              solution: 'Biometric authentication dan encrypted local storage.'
            }
          ]
        },
        {
          id: 'biometric-verification',
          name: 'Biometric Verification',
          summary: 'Fingerprint dan face recognition untuk customer onboarding.',
          challenges: [
            {
              problem: 'Varied device capabilities untuk biometric capture.',
              solution: 'Adaptive biometric SDK dengan fallback options.'
            },
            {
              problem: 'Biometric data privacy compliance.',
              solution: 'Local processing dengan encrypted storage.'
            }
          ]
        }
      ],
      stack: {
        frontend: ['Flutter', 'Dart', 'Provider'],
        backend: ['Java Spring Boot', 'Microservices', 'Apache Kafka'],
        database: ['MySQL', 'Redis', 'Elasticsearch'],
        deployment: ['AWS', 'Docker', 'Jenkins']
      },
      attachments: [
        {
          type: 'image',
          title: 'Agent Banking',
          url: 'https://via.placeholder.com/800x400/059669/FFFFFF?text=Agent+Banking',
          description: 'Mobile agent banking application.'
        }
      ]
    }
  ]

  // Create projects
  for (const projectData of projects) {
    try {
      await prisma.project.create({
        data: projectData
      })
    } catch (error) {
      console.log(`Project ${projectData.slug} already exists, skipping...`)
    }
  }

  // Create admin user if it doesn't exist
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword
      }
    })
  } catch (error) {
    console.log('Admin user already exists, skipping...')
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })