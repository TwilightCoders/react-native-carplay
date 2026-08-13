import { 
  ListTemplate, 
  GridTemplate, 
  MapTemplate,
  AlertTemplate,
  ActionSheetTemplate,
  ContactTemplate,
  SearchTemplate,
  VoiceControlTemplate,
  InformationTemplate,
  PointOfInterestTemplate,
  NowPlayingTemplate,
  TabBarTemplate
} from '../src';

describe('CarPlay Templates', () => {
  describe('ListTemplate', () => {
    it('should create a basic list template', () => {
      const config = {
        title: 'Test List',
        sections: [
          {
            items: [
              { text: 'Item 1', detailText: 'Details 1' },
              { text: 'Item 2', detailText: 'Details 2' },
            ]
          }
        ],
        onItemSelect: jest.fn(),
      };

      const template = new ListTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.title).toBe('Test List');
      expect(template.config.sections).toHaveLength(1);
      expect(template.config.sections[0].items).toHaveLength(2);
    });

    it('should handle sections with headers', () => {
      const config = {
        title: 'Sectioned List',
        sections: [
          {
            header: 'Section 1',
            items: [{ text: 'Item 1.1' }]
          },
          {
            header: 'Section 2', 
            items: [{ text: 'Item 2.1' }, { text: 'Item 2.2' }]
          }
        ]
      };

      const template = new ListTemplate(config);
      
      expect(template.config.sections).toHaveLength(2);
      expect(template.config.sections[0].header).toBe('Section 1');
      expect(template.config.sections[1].header).toBe('Section 2');
      expect(template.config.sections[1].items).toHaveLength(2);
    });

    it('should handle item selection callbacks', async () => {
      const onItemSelect = jest.fn();
      const config = {
        title: 'Interactive List',
        sections: [
          {
            items: [{ text: 'Clickable Item' }]
          }
        ],
        onItemSelect
      };

      const template = new ListTemplate(config);
      
      // Simulate item selection
      await template.config.onItemSelect({ index: 0 });
      
      expect(onItemSelect).toHaveBeenCalledWith({ index: 0 });
    });

    it('should support disclosure indicators', () => {
      const config = {
        title: 'Navigable List',
        sections: [
          {
            items: [
              { text: 'Navigate Here', showsDisclosureIndicator: true },
              { text: 'No Navigation', showsDisclosureIndicator: false },
            ]
          }
        ]
      };

      const template = new ListTemplate(config);
      
      expect(template.config.sections[0].items[0].showsDisclosureIndicator).toBe(true);
      expect(template.config.sections[0].items[1].showsDisclosureIndicator).toBe(false);
    });
  });

  describe('GridTemplate', () => {
    it('should create a basic grid template', () => {
      const config = {
        title: 'Test Grid',
        buttons: [
          { 
            titleVariants: ['Button 1'], 
            image: 'icon1',
            onPress: jest.fn() 
          },
          { 
            titleVariants: ['Button 2'], 
            image: 'icon2',
            onPress: jest.fn() 
          }
        ]
      };

      const template = new GridTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.title).toBe('Test Grid');
      expect(template.config.buttons).toHaveLength(2);
    });

    it('should handle button press callbacks', async () => {
      const onPress1 = jest.fn();
      const onPress2 = jest.fn();
      
      const config = {
        title: 'Interactive Grid',
        buttons: [
          { titleVariants: ['Button 1'], onPress: onPress1 },
          { titleVariants: ['Button 2'], onPress: onPress2 }
        ]
      };

      const template = new GridTemplate(config);
      
      // Simulate button presses
      await template.config.buttons[0].onPress();
      await template.config.buttons[1].onPress();
      
      expect(onPress1).toHaveBeenCalled();
      expect(onPress2).toHaveBeenCalled();
    });
  });

  describe('MapTemplate', () => {
    it('should create a basic map template', () => {
      const config = {
        component: 'MapComponent',
        mapButtons: [
          { id: 'zoom-in', image: 'plus', onPress: jest.fn() },
          { id: 'zoom-out', image: 'minus', onPress: jest.fn() }
        ],
        onStartedTrip: jest.fn(),
        onAlertActionPressed: jest.fn(),
      };

      const template = new MapTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.component).toBe('MapComponent');
      expect(template.config.mapButtons).toHaveLength(2);
    });

    it('should handle map button callbacks', async () => {
      const onZoomIn = jest.fn();
      const onZoomOut = jest.fn();
      
      const config = {
        mapButtons: [
          { id: 'zoom-in', onPress: onZoomIn },
          { id: 'zoom-out', onPress: onZoomOut }
        ]
      };

      const template = new MapTemplate(config);
      
      await template.config.mapButtons[0].onPress();
      await template.config.mapButtons[1].onPress();
      
      expect(onZoomIn).toHaveBeenCalled();
      expect(onZoomOut).toHaveBeenCalled();
    });
  });

  describe('AlertTemplate', () => {
    it('should create a basic alert template', () => {
      const config = {
        titleVariants: ['Alert Title'],
        actions: [
          { id: 'ok', title: 'OK', onPress: jest.fn() },
          { id: 'cancel', title: 'Cancel', onPress: jest.fn() }
        ]
      };

      const template = new AlertTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.titleVariants).toEqual(['Alert Title']);
      expect(template.config.actions).toHaveLength(2);
    });

    it('should support different action styles', () => {
      const config = {
        titleVariants: ['Confirm Action'],
        actions: [
          { id: 'confirm', title: 'Confirm', style: 'default' },
          { id: 'cancel', title: 'Cancel', style: 'cancel' },
          { id: 'delete', title: 'Delete', style: 'destructive' }
        ]
      };

      const template = new AlertTemplate(config);
      
      expect(template.config.actions[0].style).toBe('default');
      expect(template.config.actions[1].style).toBe('cancel');
      expect(template.config.actions[2].style).toBe('destructive');
    });
  });

  describe('ActionSheetTemplate', () => {
    it('should create a basic action sheet template', () => {
      const config = {
        title: 'Choose Action',
        message: 'Select an option',
        actions: [
          { id: 'option1', title: 'Option 1', onPress: jest.fn() },
          { id: 'option2', title: 'Option 2', onPress: jest.fn() }
        ]
      };

      const template = new ActionSheetTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.title).toBe('Choose Action');
      expect(template.config.message).toBe('Select an option');
      expect(template.config.actions).toHaveLength(2);
    });
  });

  describe('SearchTemplate', () => {
    it('should create a basic search template', () => {
      const onSearch = jest.fn();
      const config = {
        onSearch,
        onItemSelect: jest.fn()
      };

      const template = new SearchTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.onSearch).toBe(onSearch);
    });

    it('should handle search queries', async () => {
      const onSearch = jest.fn();
      const config = { onSearch };

      const template = new SearchTemplate(config);
      
      await template.config.onSearch('test query');
      
      expect(onSearch).toHaveBeenCalledWith('test query');
    });
  });

  describe('VoiceControlTemplate', () => {
    it('should create a voice control template', () => {
      const config = {
        voiceControlStates: [
          { identifier: 'command1', titleVariants: ['Say Command One'] },
          { identifier: 'command2', titleVariants: ['Say Command Two'] }
        ],
        onVoiceControlStateChange: jest.fn()
      };

      const template = new VoiceControlTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.voiceControlStates).toHaveLength(2);
    });
  });

  describe('InformationTemplate', () => {
    it('should create an information template', () => {
      const config = {
        title: 'Information',
        items: [
          { title: 'Item 1', detail: 'Detail 1' },
          { title: 'Item 2', detail: 'Detail 2' }
        ],
        actions: [
          { id: 'action1', title: 'Action 1', onPress: jest.fn() }
        ]
      };

      const template = new InformationTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.title).toBe('Information');
      expect(template.config.items).toHaveLength(2);
      expect(template.config.actions).toHaveLength(1);
    });
  });

  describe('ContactTemplate', () => {
    it('should create a contact template', () => {
      const config = {
        contact: {
          name: 'John Doe',
          image: 'avatar.png',
          subtitle: 'Emergency Contact',
          informativeText: 'Available 24/7'
        },
        actions: [
          { id: 'call', title: 'Call', onPress: jest.fn() },
          { id: 'message', title: 'Message', onPress: jest.fn() }
        ]
      };

      const template = new ContactTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.contact.name).toBe('John Doe');
      expect(template.config.actions).toHaveLength(2);
    });
  });

  describe('PointOfInterestTemplate', () => {
    it('should create a point of interest template', () => {
      const config = {
        title: 'Points of Interest',
        items: [
          {
            id: 'poi1',
            location: { latitude: 37.7749, longitude: -122.4194 },
            title: 'Golden Gate Bridge',
            subtitle: 'San Francisco landmark'
          }
        ],
        onChangeMapRegion: jest.fn(),
        onItemSelect: jest.fn()
      };

      const template = new PointOfInterestTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.title).toBe('Points of Interest');
      expect(template.config.items).toHaveLength(1);
      expect(template.config.items[0].location.latitude).toBe(37.7749);
    });
  });

  describe('NowPlayingTemplate', () => {
    it('should create a now playing template', () => {
      const config = {
        albumArtistButtonEnabled: true,
        upNextButtonEnabled: true,
        upNextTitle: 'Up Next',
        onAlbumArtistButtonPressed: jest.fn(),
        onUpNextButtonPressed: jest.fn()
      };

      const template = new NowPlayingTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.albumArtistButtonEnabled).toBe(true);
      expect(template.config.upNextButtonEnabled).toBe(true);
    });
  });

  describe('TabBarTemplate', () => {
    it('should create a tab bar template', () => {
      const config = {
        templates: [
          { title: 'Tab 1', template: new ListTemplate({ title: 'List 1', sections: [] }) },
          { title: 'Tab 2', template: new GridTemplate({ title: 'Grid 1', buttons: [] }) }
        ],
        onTemplateSelect: jest.fn()
      };

      const template = new TabBarTemplate(config);
      
      expect(template.config).toEqual(config);
      expect(template.config.templates).toHaveLength(2);
      expect(template.config.templates[0].title).toBe('Tab 1');
      expect(template.config.templates[1].title).toBe('Tab 2');
    });

    it('should handle tab selection', async () => {
      const onTemplateSelect = jest.fn();
      const config = {
        templates: [
          { title: 'Tab 1', template: new ListTemplate({ title: 'List 1', sections: [] }) }
        ],
        onTemplateSelect
      };

      const template = new TabBarTemplate(config);
      
      await template.config.onTemplateSelect('Tab 1');
      
      expect(onTemplateSelect).toHaveBeenCalledWith('Tab 1');
    });
  });

  describe('Template Configuration Validation', () => {
    it('should handle missing required properties gracefully', () => {
      // These should not throw errors, but create templates with default/empty configs
      expect(() => new ListTemplate({})).not.toThrow();
      expect(() => new GridTemplate({})).not.toThrow();
      expect(() => new MapTemplate({})).not.toThrow();
      expect(() => new AlertTemplate({})).not.toThrow();
    });

    it('should preserve all provided configuration properties', () => {
      const config = {
        title: 'Test',
        customProperty: 'custom value',
        nested: {
          property: 'nested value'
        }
      };

      const template = new ListTemplate(config);
      
      expect(template.config.title).toBe('Test');
      expect(template.config.customProperty).toBe('custom value');
      expect(template.config.nested.property).toBe('nested value');
    });
  });
});