/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsStack = {
  '💻 cs': [
    {
      type: 'category',
      label: '💻 CS',
      link: {
        type: 'generated-index',
        slug: '/category/cs',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '计算机网络',
          link: {
            type: 'generated-index',
            slug: '/category/computer-network',
          },
          items: [
            'cs/network/computer-network-architecture',
          ],
        },
      ],
    },
  ],
  '⌨️ programming': [
    {
      type: 'category',
      label: '⌨️ Programming',
      link: {
        type: 'generated-index',
        slug: '/category/programming',
      },
      collapsed: true,
      items: [
        // C/C++
        {
          type: 'category',
          label: 'C/C++',
          link: {
            type: 'generated-index',
            slug: '/category/C-C_plus_plus',
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "OOP",
              collapsed: true,
              items: [
                'programming/cc/oop/cc-classes-and-objects',
                'programming/cc/oop/cc-classes-and-objects-2',
                'programming/cc/oop/cc-generic-and-template',
                'programming/cc/oop/cc-generic-and-template-2',
                'programming/cc/oop/cc-classes-virtual-function',
              ],
            },
            {
              type: "category",
              label: "C++11",
              collapsed: true,
              items: [
                'programming/cc/11/cc-11-unified-init',
                'programming/cc/11/cc-11-auto',
                'programming/cc/11/cc-11-nullptr',
                'programming/cc/11/cc-11-using',
                'programming/cc/11/cc-11-new-for',
                'programming/cc/11/cc-11-auto-ptr',
                'programming/cc/11/cc-11-lambda',
                'programming/cc/11/cc-11-files-and-exceptions',
                'programming/cc/11/cc-11-scope-enum',
              ],
            },
            {
              type: "category",
              label: "More Effective C++",
              collapsed: true,
              items: [
                'programming/cc/effective_cc/distinguish-pointers-reference',
              ],
            },
            {
              type: "category",
              label: "boost",
              collapsed: true,
              items: [
                'programming/cc/boost/cc-boost-install',
              ],
            },
            // {
            //   type: "category",
            //   label: "C++20",
            //   collapsed: true,
            //   items: [
                
            //   ],
            // },
          ],
        },
        // Python
        {
          type: 'category',
          label: 'Python',
          link: {
            type: 'generated-index',
            slug: '/category/py',
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Package",
              collapsed: true,
              items: [
                'programming/py/python-serial',
              ],
            },
            {
                type: "category",
                label: "example",
                collapsed: true,
                items: [
                  'programming/py/python-定时任务实现',
                ],
              },
          ],
        },
        // Data Structures
        {
          type: 'category',
          label: 'Data Structures',
          link: {
            type: 'generated-index',
            slug: '/category/data-structures',
          },
          collapsed: true,
          items: [
            // {
            //   type: "category",
            //   label: "大话数据结构笔记",
            //   collapsed: true,
            //   items: [
            //     'programming/data-structures/大话数据结构/data-structures-introduction',
            //     {
            //       type: "category",
            //       label: "第二章 算法",
            //       collapsed: true,
            //       items: [
            //         'programming/data-structures/大话数据结构/data-structures-algorithm',
            //         'programming/data-structures/大话数据结构/data-structures-algorithm-2',
            //       ],
            //     },
      
            //     {
            //       type: "category",
            //       label: "第三章 线性表",
            //       collapsed: true,
            //       items: [
            //         'programming/data-structures/大话数据结构/data-structures-list',
            //       ],
            //     },
            //   ],
            // },
      
            // {
            //   type: "category",
            //   label: "剑指Offer笔记",
            //   collapsed: true,
            //   items: [
            //     'programming/data-structures/剑指offer/常见数据结构',
            //     'programming/data-structures/剑指offer/赋值运算符函数',
            //   ],
            // },
            {
              type: "category",
              label: "🌲 Tree",
              link: {
                type: 'generated-index',
                slug: '/category/tree',
              },
              items: [
                'programming/data-structures/tree/data-structures-tree-traversal',
                'programming/data-structures/tree/data-structures-tree-level-order',
                'programming/data-structures/tree/data-structures-tree-depth',
              ],
            },
          ],
        },
        
        // Algorithm
        {
          type: 'category',
          label: 'Algorithm',
          link: {
            type: 'generated-index',
            slug: '/category/algorithm',
          },
          items:[
            {
              type: "category",
              label: "🍩 Greedy",
              collapsed: true,
              items: [
                'programming/algorithm/greedy/algorithm-376-wiggle-subsequence',
                'programming/algorithm/dp/algorithm-53-max-sub-array',
                'programming/algorithm/dp/algorithm-122-best-time-to-buy-and-sell-stock-ii',
              ],
            },
            {
              type: "category",
              label: "🗂 DP",
              collapsed: true,
              items: [
                'programming/algorithm/greedy/algorithm-376-wiggle-subsequence',
                'programming/algorithm/dp/algorithm-122-best-time-to-buy-and-sell-stock-ii',
                'programming/algorithm/dp/algorithm-53-max-sub-array',
              ],
            },
          ],
        },

        // Design Pattern
        {
          type: 'category',
          label: 'Design Pattern',
          link: {
            type: 'generated-index',
            slug: '/category/design-pattern',
          },
          collapsed: true,
          items: [
            'programming/design-pattern/design-pattern-UML-class-diagram',
            // {
            //   type: "category",
            //   label: "",
            //   collapsed: true,
            //   items: [
                
            //   ],
            // },
          ],
        },

        // front-end
        {
          type: 'category',
          label: '前端',
          link: {
            type: 'generated-index',
            slug: '/category/front-end',
          },
          items:[
            {
              type: 'category',
              label: 'React',
              items: [
                {
                  type: 'category',
                  label: 'Demo',
                  items: [
                    'programming/front-end/React/demo/gameboy-component'
                  ],
                },
              ],
            },
          ],
        },
        // ios
        {
          type: 'category',
          label: 'IOS',
          link: {
            type: 'generated-index',
            slug: '/category/ios',
          },
          collapsed: true,
          items: [
            'programming/ios/ios-about-xcode',
            'programming/ios/ios-reference-data',
            {
              type: "category",
              label: "swift",
              collapsed: true,
              items: [
                'programming/ios/swift/swift-optional',
              ],
            },
            {
              type: "category",
              label: "swiftUI",
              collapsed: true,
              items: [
                'programming/ios/swiftUI/swiftUI-show-web-pages',
                'programming/ios/swiftUI/swiftUI-screen-shot',
                'programming/ios/swiftUI/swiftUI-ReplayKit'
              ],
            },
            // {
            //   type: "category",
            //   label: "Project",
            //   collapsed: true,
            //   items: [
                
            //   ],
            // },
          ],
        },
      ],
    },
  ],

  '📦 Tools': [
    // VSCode
    {
      type: 'category',
      label: '📦 Tools',
      link: {
        type: 'generated-index',
        slug: '/category/tools',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "vscode",
          collapsed: true,
          items: [
            'tools/vscode/about-vscode'
          ],
        },
        // {
        //   type: "category",
        //   label: "PyCharm",
        //   collapsed: true,
        //   items: [

        //   ],
        // },
        // {
        //   type: "category",
        //   label: "CLion",
        //   collapsed: true,
        //   items: [

        //   ],
        // },
        // {
        //   type: "category",
        //   label: "Edges",
        //   collapsed: true,
        //   items: [

        //   ],
        // },
      ],
    },
  ],

  '👀 CV && 🧠 ML & DL': [
    {
      type: 'category',
      label: '👀 CV',
      link: {
        type: 'generated-index',
        slug: '/category/cv',
      },
      collapsed: true,
      items: [
        // Object Detection
        {
          type: 'category',
          label: '🎯 Object Detection',
          link: {
            type: 'generated-index',
            slug: '/category/CV-object-detection',
          },
          collapsed: true,
          items: [
            'cv/object-detection/cv-object-detection-evaluation',
            'cv/object-detection/cv-object-detection-iou',
            'cv/object-detection/cv-object-detection-nms',
            
          ],
        },
        // // Segmentation
        // {
        //   type: 'category',
        //   label: '✂ Segmentation',
        //   link: {
        //     type: 'generated-index',
        //     slug: '/category/CV-segmentation',
        //   },
        //   collapsed: true,
        //   items: [            
        //   ],
        // },
        // OpenCV
        {
          type: 'category',
          label: '🥽 OpenCV',
          link: {
            type: 'generated-index',
            slug: '/category/OpenCV',
          },
          collapsed: true,
          items: [
            'cv/opencv/install/about-opencv',
            {
              type: "category",
              label: "install",
              collapsed: true,
              items: [
                'cv/opencv/install/opencv-install-cpu',
                'cv/opencv/install/opencv-install-gpu',
                'cv/opencv/install/opencv-build-cfg',
              ],
            },
            {
              type: "category",
              label: "apply",
              collapsed: true,
              items: [
                'cv/opencv/apply/common-method/opencv-waitKey',
                'cv/opencv/apply/common-method/opencv-roi',
                'cv/opencv/apply/common-method/opencv-hough-transform',
                'cv/opencv/apply/tutorials/opencv-equalizeHist',
                'cv/opencv/apply/tutorials/opencv-solvePnP-pose-computation',
                'cv/opencv/apply/demo/opencv-lane-detect',
                'cv/opencv/apply/opencv-nginx-rtmp-pull-stream',

                {
                  type: "category",
                  label: "OpenCV threading",
                  collapsed: true,
                  items: [
                      'cv/opencv/apply/threading/opencv-python-threading-video-stream',
                      'cv/opencv/apply/threading/opencv-cpp-threading-video-stream',
                    ],
                },
                {
                  type: "category",
                  label: "OpenCV DNN",
                  collapsed: true,
                  items: [
                      'cv/opencv/apply/dnn/opencv-dnn-yolov4',
                      'cv/opencv/apply/dnn/opencv-dnn-yolov5-6-0',
                      'cv/opencv/apply/dnn/opencv-dnn-ultralytics',
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "expand",
              collapsed: true,
              items: [
                'cv/opencv/expand/opencv-pixel-connect',
              ],
            },
          ],
        },
        // YOLO
        {
          type: 'category',
          label: '😉 YOLO',
          link: {
            type: 'generated-index',
            slug: '/category/YOLO',
          },
          collapsed: true,
          items: [
            'cv/yolo/yolov5-start',
            'cv/yolo/yolov5-train',
            'cv/yolo/yolov5-训练自建数据集',
            'cv/yolo/yolov5-6.0-train',
            'cv/yolo/yolov8-train'
          ],
        }, 
        // Point Cloud
        {
          type: 'category',
          label: '🌪 Point Cloud',
          link: {
            type: 'generated-index',
            slug: '/category/Point-Cloud',
          },
          collapsed: true,
          items: [
            {
              type: "category",
              label: "PCL",
              collapsed: true,
              items: [
                'cv/point-cloud/PCL/pcl-install',
                'cv/point-cloud/PCL/pcl-visualizer'
              ],
            },
            {
              type: "category",
              label: "Open3D",
              collapsed: true,
              items: [
                'cv/point-cloud/Open3D/open3d-install',
              ],
            },
          ],
        },
      ],
    },

    // ML & DL
    {
      type: 'category',
      label: '🧠 ML & DL',
      link: {
        type: 'generated-index',
        slug: '/category/ml-dl',
      },
      collapsed: true,
      items: [
        'cv/ml-dl/note/about-AI',
        {
          type: "category",
          label: "机器学习",
          collapsed: true,
          items: [
            'cv/ml-dl/note/ml/机器学习的基本概念',
            'cv/ml-dl/note/ml/机器学习的三个基本要素',
            'cv/ml-dl/note/ml/线性回归',
          ],
        },
        // PyTorch
        {
          type: 'category',
          label: '🔥 PyTorch',
          link: {
            type: 'generated-index',
            slug: '/category/PyTorch',
          },
          collapsed: true,
          items: [
            'cv/ml-dl/pytorch/about-pytorch',
            'cv/ml-dl/pytorch/pytorch-install',
            {
              type: "category",
              label: "model",
              collapsed: true,
              items: [
                'cv/ml-dl/pytorch/pytorch-resnet',
              ],
            },
            // {
            //   type: "category",
            //   label: " ",
            //   collapsed: true,
            //   items: [
              
            //   ],
            // },
          ],
          
        },
      ],
    },
  ],

  '🤖 Robot': [
    {
      type: 'category',
      label: '🤖 Robot',
      link: {
        type: 'generated-index',
        slug: '/category/robot',
      },
      collapsed: true,
      items: [
        // ROS
        {
          type: 'category',
          label: 'ROS',
          link: {
            type: 'generated-index',
            slug: '/category/ROS',
          },
          collapsed: true,
          items: [
            'robot/ros/ros-install',
            {
              type: "category",
              label: "入门",
              collapsed: true,
              items: [
                'robot/ros/ros-core-concepts',
                'robot/ros/ros-workspace-and-pkg',
                'robot/ros/ros-vscode',
                'robot/ros/ros-publisher',
                'robot/ros/ros-subscriber',
                'robot/ros/ros-callback',
                'robot/ros/ros-topic-话题消息定义与使用',
                'robot/ros/ros-launch',
              ],
            },
            {
              type: "category",
              label: "ros-pcl",
              collapsed: true,
              items: [
                'robot/ros/ros-point-cloud/ros-bag-to-pcd',
                'robot/ros/ros-point-cloud/ros-rosbag-play-rviz',
                'robot/ros/ros-point-cloud/ros-pcl-topic',
              ],
            },
            {
              type: "category",
              label: "point-cloud-segmentation",
              collapsed: true,
              items: [
                'robot/ros/ros-point-cloud/segmentation/ros-intrinsic_velodyne_pattern',
                'robot/ros/ros-point-cloud/segmentation/ros-point_cloud_object_segemntation_references',
                'robot/ros/ros-point-cloud/segmentation/ros-traditional_point_cloud_object_segmentation',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'ROS2',
          link: {
            type: 'generated-index',
            slug: '/category/ROS2',
          },
          collapsed: true,
          items: [
            'robot/ros2/ros2-install',
            'robot/ros2/ros2-install-wsl2',
          ],
        },
        {
          type: 'category',
          label: 'VSLAM',
          link: {
            type: 'generated-index',
            slug: '/category/VSLAM',
          },
          collapsed: true,
          items: [
            'robot/vslam/vslam-evo',
          ],
        },
      ],
    },
  ],
  
  '💽 System': [
    {
      type: 'category',
      label: "💽 System",
      link: {
        type: 'generated-index',
        slug: '/category/system',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Ubuntu",
          collapsed: true,
          items: [
            'system/linux/ubuntu/try-ubuntu-fix-grub',
            'system/linux/ubuntu/ubuntu-18-04-obs',
            'system/linux/ubuntu/ubuntu-18-04-starting-script',
            'system/linux/ubuntu/ubuntu-18-04-script-sudo',
            'system/linux/ubuntu/ubuntu-18-04-tweaks',
            'system/linux/ubuntu/ubuntu-application-desktop',
            'system/linux/ubuntu/ubuntu-20-04-cuda-toolkit',
            // 'system/linux/ubuntu/',
          ],
        },
        {
          type: "category",
          label: "Windows",
          collapsed: true,
          items: [
            'system/win/win11-wsl-ubuntu2204',
            'system/win/win11-wsl-clash-proxy',
            'system/win/win11-wsl-usb',
          ],
        },
      ],
    },
  ],

  '🔌 devices': [
    {
      type: 'category',
      label: "🔌 devices",
      link: {
        type: 'generated-index',
        slug: '/category/devices',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Jetson-Nano",
          collapsed: true,
          items: [
            'devices/jetson-nano/jetson-nano-start',
            'devices/jetson-nano/jetson-nano-stats',
            'devices/jetson-nano/jetson-nano-archiconda',
            'devices/jetson-nano/jetson-nano-install-pytorch',
            'devices/jetson-nano/jetson-nano-install-opencv',
            'devices/jetson-nano/jetson-nano-gpio',
            'devices/jetson-nano/jetson-nano-megflow-megengine',
          ],
        },
        {
          type: "category",
          label: "ESP32",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Get Start",
              collapsed: true,
              items: [
                'devices/esp32/get-start/esp32-idf-Clion-env',
                'devices/esp32/get-start/esp32-CLion-flash-seria-port-permission',
                'devices/esp32/get-start/esp32-demo-blink',
              ],
            },
            {
              type: "category",
              label: "FreeRTOS",
              collapsed: true,
              items: [
                'devices/esp32/freertos/esp32-freertos-task',
                'devices/esp32/freertos/esp32-demo-freertos_task_list',
                'devices/esp32/freertos/esp32-demo-freertos-event_group',
              ],
            },
            {
              type: "category",
              label: "Wi-Fi",
              collapsed: true,
              items: [
                'devices/esp32/wifi/esp32-demo-wifi',
                'devices/esp32/wifi/esp32-demo-wifi-scan',
                'devices/esp32/wifi/esp32-demo-tcp-server',
              ],
            },
          ],
        },
        // RealSense
        {
          type: 'category',
          label: 'RealSense',
          link: {
            type: 'generated-index',
            slug: '/category/realsense',
          },
          collapsed: true,
          items: [
            'devices/realsense/intel-realsense-start',
            'devices/realsense/intel-realsense-apriltag',
            'devices/realsense/intel-realsense-intrinsics',
          ],
        },
      ],
    },
  ],

  '🔩 3D Modeling': [
    {
      
      type: "category",
      label: "Fusion 360",
      link: {
        type: 'generated-index',
        slug: '/category/Fusion 360',
      },
      collapsed: true,
      items: [
        '3D-modeling/fusion360/fusion360-rack-and-pinion',
      ],
    },
  ],
}

module.exports = sidebarsStack;