/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsStack = {
  '⌨️programming': [
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
          label: "面对对象",
          collapsed: true,
          items: [
            'programming/cc/Object-Oriented/cc-classes-and-objects',
            'programming/cc/Object-Oriented/cc-classes-and-objects-2',
            'programming/cc/Object-Oriented/cc-generic-and-template',
            'programming/cc/Object-Oriented/cc-generic-and-template-2',
            'programming/cc/Object-Oriented/cc-classes-virtual-function',
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
        {
          type: "category",
          label: "大话数据结构读书笔记",
          collapsed: true,
          items: [
            'programming/data-structures/大话数据结构/data-structures-introduction',
            {
              type: "category",
              label: "第二章 算法",
              collapsed: true,
              items: [
                'programming/data-structures/大话数据结构/data-structures-algorithm',
                'programming/data-structures/大话数据结构/data-structures-algorithm-2',
              ],
            },
  
            {
              type: "category",
              label: "第三章 线性表",
              collapsed: true,
              items: [
                'programming/data-structures/大话数据结构/data-structures-list',
              ],
            },
          ],
        },
  
        {
          type: "category",
          label: "🗡剑指Offer笔记",
          collapsed: true,
          items: [
            'programming/data-structures/剑指offer/常见数据结构',
            'programming/data-structures/剑指offer/赋值运算符函数',
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
    // IDE
    {
      type: 'category',
      label: 'IDE',
      link: {
        type: 'generated-index',
        slug: '/category/ide',
      },
      collapsed: true,
      items: [
        'programming/IDE/vscode/about-vscode'
      ],
    },
  ],

  '👀CV & Robot': [
    // OpenCV
    {
      type: 'category',
      label: 'OpenCV',
      link: {
        type: 'generated-index',
        slug: '/category/OpenCV',
      },
      collapsed: true,
      items: [
        'cv/opencv/about-opencv',
        {
          type: "category",
          label: "install",
          collapsed: true,
          items: [
            'cv/opencv/opencv-install-cpu',
            'cv/opencv/opencv-install-gpu',
            'cv/opencv/opencv-build-cfg',
          ],
        },
        'cv/opencv/opencv-pixel-connect',
        {
          type: "category",
          label: "常用方法",
          collapsed: true,
          items: [
            'cv/opencv/common-method/opencv-waitKey',
            'cv/opencv/common-method/opencv-roi',
            'cv/opencv/common-method/opencv-hough-transform',
          ],
        },
        {
          type: "category",
          label: "OpenCV tutorials",
          collapsed: true,
          items: [
              'cv/opencv/tutorials/opencv-equalizeHist',
              'cv/opencv/tutorials/opencv-solvePnP-pose-computation',
          ],
        },
        {
          type: "category",
          label: "OpenCV DNN",
          collapsed: true,
          items: [
              'cv/opencv/dnn/opencv-dnn-yolov4',
              'cv/opencv/dnn/opencv-dnn-yolov5-6-0',
          ],
        },
        {
          type: "category",
          label: "OpenCV Demo",
          collapsed: true,
          items: [
              'cv/opencv/demo/车道线检测/opencv-lane-detect',
          ],
        },
      ],
    },
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
        'ROS/ros/ros-install',
        {
          type: "category",
          label: "入门",
          collapsed: true,
          items: [
            'ROS/ros/ros-core-concepts',
            'ROS/ros/ros-workspace-and-pkg',
            'ROS/ros/ros-vscode',
            'ROS/ros/ros-publisher',
            'ROS/ros/ros-subscriber',
            'ROS/ros/ros-callback',
            'ROS/ros/ros-topic-话题消息定义与使用',
            'ROS/ros/ros-launch',
          ],
        },
        {
          type: "category",
          label: "ros-pcl",
          collapsed: true,
          items: [
            'ROS/ros/ros-point-cloud/ros-bag-to-pcd',
            'ROS/ros/ros-point-cloud/ros-rosbag-play-rviz',
            'ROS/ros/ros-point-cloud/ros-pcl-topic',
          ],
        },
        {
          type: "category",
          label: "point-cloud-segmentation",
          collapsed: true,
          items: [
            'ROS/ros/ros-point-cloud/segmentation/ros-intrinsic_velodyne_pattern',
            'ROS/ros/ros-point-cloud/segmentation/ros-point_cloud_object_segemntation_references',
            'ROS/ros/ros-point-cloud/segmentation/ros-traditional_point_cloud_object_segmentation',
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
        'ROS/ros2/ros2-install',
      ],
    },
    // note
    {
      type: 'category',
      label: 'ML & DL',
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
      ],
    },
    // PyTorch
    {
      type: 'category',
      label: 'PyTorch',
      link: {
        type: 'generated-index',
        slug: '/category/PyTorch',
      },
      collapsed: true,
      items: [
        'cv/ml-dl/pytorch/about-pytorch',
        'cv/ml-dl/pytorch/pytorch-install',
        // {
        //   type: "category",
        //   label: " ",
        //   collapsed: true,
        //   items: [
          
        //   ],
        // },
      ],
      
    },
    // YOLO
    {
      type: 'category',
      label: 'YOLO',
      link: {
        type: 'generated-index',
        slug: '/category/YOLO',
      },
      collapsed: true,
      items: [
        'cv/ml-dl/yolo/yolov5-start',
        'cv/ml-dl/yolo/yolov5-train',
        'cv/ml-dl/yolo/yolov5-训练自建数据集',
        'cv/ml-dl/yolo/yolov5-6.0-train'
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
        'cv/realsense/intel-realsense-start',
        'cv/realsense/intel-realsense-apriltag',
        'cv/realsense/intel-realsense-intrinsics',
      ],
    },
    
    // Point Cloud
    {
      type: 'category',
      label: 'Point Cloud',
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
  
  '🖥️devices&system': [
    {
      type: 'category',
      label: "devices",
      link: {
        type: 'generated-index',
        slug: '/category/devices',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Jeston-Nano",
          collapsed: true,
          items: [
            'devices/nvidia/jeston-nano/jetson-nano-start',
            'devices/nvidia/jeston-nano/jetson-nano-stats',
            'devices/nvidia/jeston-nano/jetson-nano-archiconda',
            'devices/nvidia/jeston-nano/jetson-nano-install-pytorch',
            'devices/nvidia/jeston-nano/jetson-nano-install-opencv',
            'devices/nvidia/jeston-nano/jetson-nano-gpio',
            'devices/nvidia/jeston-nano/jetson-nano-megflow-megengine',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: "system",
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
            // 'system/linux/ubuntu/',
          ],
        },
      ],
    },
  ],

  '🔩 Handmade': [
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