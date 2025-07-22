# Custom Image Position Widget for Decap CMS - Implementation Plan

## Project Overview
Create a custom Decap CMS widget that allows editors to visually position images by dragging within a preview area, generating precise CSS `object-position` percentage values.

---

## Phase 1: Technical Foundation

### 1.1 Widget Architecture
- **Widget Name**: `image-position-picker`
- **Output Format**: `"X% Y%"` (e.g., "25% 75%")
- **Components**:
  - `PositionControl`: Main input component with drag interface
  - `PositionPreview`: Preview component for CMS preview pane
  - `DragHandle`: Interactive positioning element

### 1.2 CSS object-position Mechanics
- **X-axis**: 0% = left edge, 50% = center, 100% = right edge
- **Y-axis**: 0% = top edge, 50% = center, 100% = bottom edge
- **Format**: `object-position: X% Y%`
- **Default**: `50% 50%` (center)

---

## Phase 2: Widget Development

### 2.1 Core Control Component
```javascript
// File: src/widgets/ImagePositionControl.js
class ImagePositionControl extends React.Component {
  state = {
    x: 50, // percentage 0-100
    y: 50, // percentage 0-100
    isDragging: false
  }

  handleMouseDown = (e) => { /* drag start logic */ }
  handleMouseMove = (e) => { /* update position */ }
  handleMouseUp = () => { /* drag end logic */ }
  
  updatePosition = (x, y) => {
    this.setState({ x, y })
    this.props.onChange(`${x}% ${y}%`)
  }
}
```

### 2.2 Visual Interface Features
- **Preview Container**: Shows actual image with positioning
- **Drag Handle**: Visual indicator of current position
- **Grid Overlay**: Optional grid lines for precision
- **Coordinate Display**: Shows exact X%, Y% values
- **Reset Button**: Return to center (50%, 50%)
- **Preset Buttons**: Quick access to corners/edges

### 2.3 User Experience Design
```
┌─────────────────────────────┐
│  Image Position Picker     │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │     [Drag Handle]       │ │  <- Interactive area
│ │                         │ │
│ └─────────────────────────┘ │
│ Position: 25% 75%           │  <- Live coordinates
│ [Reset] [Presets ▼]        │  <- Quick actions
└─────────────────────────────┘
```

---

## Phase 3: Integration Implementation

### 3.1 Widget Registration
```javascript
// File: static/admin/cms.js
import { ImagePositionControl, ImagePositionPreview } from './widgets/image-position'

CMS.registerWidget({
  name: 'image-position-picker',
  control: ImagePositionControl,
  preview: ImagePositionPreview,
  schema: {
    properties: {
      default: { type: 'string', default: '50% 50%' }
    }
  }
})
```

### 3.2 CMS Configuration Update
```yaml
# File: static/admin/config.yml
fields:
  - label: "Imagen"
    name: "image"
    widget: "image"
  - label: "Posición de Imagen"
    name: "imagePosition"
    widget: "image-position-picker"
    default: "50% 50%"
    required: false
```

### 3.3 Template Integration
- **No changes needed**: Current `getObjectPosition()` function already handles percentage values
- **Backwards compatible**: Existing keyword values continue working
- **Enhanced precision**: Percentage values provide exact positioning

---

## Phase 4: Advanced Features

### 4.1 Smart Presets
```javascript
const POSITION_PRESETS = {
  'Center': '50% 50%',
  'Top Center': '50% 20%',
  'Bottom Center': '50% 80%',
  'Left Center': '20% 50%',
  'Right Center': '80% 50%',
  'Top Left': '20% 20%',
  'Top Right': '80% 20%',
  'Bottom Left': '20% 80%',
  'Bottom Right': '80% 80%'
}
```

### 4.2 Real-time Preview
- **Live preview**: Shows actual article image with positioning
- **Responsive preview**: Different container sizes
- **Zoom functionality**: Detailed positioning for precision

### 4.3 Accessibility Features
- **Keyboard navigation**: Arrow keys for fine positioning
- **Screen reader support**: Announces position changes
- **High contrast mode**: Clear visual indicators
- **Touch support**: Mobile-friendly drag interaction

---

## Phase 5: Technical Implementation Details

### 5.1 File Structure
```
static/admin/
├── cms.js (widget registration)
├── widgets/
│   ├── image-position/
│   │   ├── index.js (main exports)
│   │   ├── Control.js (drag interface)
│   │   ├── Preview.js (preview component)
│   │   ├── DragHandle.js (drag logic)
│   │   └── styles.css (widget styling)
```

### 5.2 Build Process
- **No build step required**: Pure JavaScript/React
- **Direct integration**: Load via script tags in CMS
- **CSS inclusion**: Inline styles or separate CSS file

### 5.3 Browser Compatibility
- **Modern browsers**: Full drag functionality
- **Fallback support**: Click-to-position for older browsers
- **Mobile optimized**: Touch-friendly interface

---

## Phase 6: Testing & Validation

### 6.1 Test Scenarios
- Drag positioning accuracy
- Percentage calculation precision
- Cross-browser compatibility
- Mobile touch interaction
- Keyboard accessibility
- Screen reader compatibility

### 6.2 Integration Testing
- CMS field validation
- Preview accuracy
- Save/load functionality
- Migration from existing articles

---

## Phase 7: Documentation & Training

### 7.1 User Documentation
- How to use the drag interface
- Understanding position coordinates
- Preset options explanation
- Keyboard shortcuts guide

### 7.2 Technical Documentation
- Widget API reference
- Customization options
- Troubleshooting guide
- Performance considerations

---

## Benefits of This Approach

### ✅ **User Experience**
- **Intuitive**: Drag-and-drop is natural
- **Visual**: See exact positioning in real-time
- **Precise**: Infinite positioning options
- **Fast**: No need to test multiple presets

### ✅ **Technical Benefits**
- **Scalable**: No limit to position options
- **Maintainable**: Single widget vs dozens of presets
- **Backwards compatible**: Works with existing implementation
- **Future-proof**: Percentage-based system is standard

### ✅ **Editor Workflow**
- **Efficient**: Position images quickly
- **Accurate**: Get exactly the framing needed
- **Consistent**: Same interface for all images
- **Professional**: Advanced control without complexity

---

## Estimated Implementation Time
- **Phase 1-2**: 2-3 days (core widget development)
- **Phase 3**: 1 day (integration)
- **Phase 4-5**: 2-3 days (advanced features)
- **Phase 6-7**: 1-2 days (testing & docs)
- **Total**: 6-9 days for full implementation

This would create a professional-grade image positioning tool that rivals premium CMS solutions while maintaining the simplicity of the current system.

---

## Current System Context

This plan builds upon the existing image position implementation in the RadioKashana website:

- **Current Implementation**: Dropdown with 9 preset positions (center, top, bottom, left, right, corners)
- **Template Integration**: `getObjectPosition()` function in `src/templates/newTemplate.js`
- **CMS Field**: `imagePosition` field in Decap CMS config
- **CSS System**: Uses `object-position` CSS property for image positioning
- **Robust Error Handling**: Multiple fallback layers for missing/invalid values

The custom widget would replace the current dropdown while maintaining full backwards compatibility and enhancing the user experience significantly.