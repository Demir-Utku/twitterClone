import React from 'react';
import { Text, View, Linking, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { colors } from '../../style'

const Menu = (props) => {

    const sections = (icon, name, onPress) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '', alignItems: 'center', marginBottom: 20 }}>
                {icon != null ? <Icon name={icon} size={20} style={{ width: 30 }} /> : null}
                <Text onPress={onPress} style={{ fontSize: 14, marginLeft: 20 }}>{name}</Text>
            </View>
        )
    }

    const selectPhoto = () => {

        const options = {
            title: 'Profil Fotoğrafı Seçiniz',
            quality: 0.2,
            takePhotoButtonTitle: 'Resim Çek',
            chooseFromLibraryButtonTitle: 'Galeriden Seç',
            cancelButtonTitle: 'Kapat',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                setImage(uri)
            }
        });

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 2, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {
                        props.profile_image?
                            <TouchableOpacity
                                onPress={() => selectPhoto()}
                            >
                                <Image
                                    source={{ uri: '' }}
                                    style={{ width: 60, height: 60, borderRadius: 30, }}
                                /></TouchableOpacity> :
                            <Icon name={'user-circle'} size={40} onPress={() => selectPhoto()} />
                    }
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{'Utku'}</Text>
                    <Text style={{ fontSize: 12 }}>@{'utkdmr'}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 12 }}>20 </Text>
                        <Text style={{ fontSize: 12 }}>Takip edilenler  </Text>
                        <Text style={{ fontSize: 12 }}>110 </Text>
                        <Text style={{ fontSize: 12 }}>Takipçiler</Text>
                    </View>
                </View>
                <Icon name={'ellipsis-h'} size={20} color={colors.main} />
            </View>

            <View style={{ flex: 7 }}>
                <ScrollView style={{ backgroundColor: '' }}>
                    <View style={{ backgroundColor: '', padding: 20 }}>
                        {sections('user', 'Profil', () => {

                        })}
                        {sections('list-alt', 'Listeler')}
                        {sections('adjust', 'Konu Başlıkları')}
                        {sections('bookmark', 'Yer İşaretleri')}
                        {sections('bolt', 'Anlar')}
                        {sections('id-badge', 'Takipçi İstekleri')}
                    </View>

                    <View style={{ backgroundColor: 'black', height: 0.5, width: '100%', marginBottom: 20 }} />

                    {sections(null, 'Ayarlar ve gizlilik')}
                    {sections(null, 'Yardım Merkezi',
                        () => {
                            Linking.openURL('https://help.twitter.com/tr');
                        }
                    )}

                </ScrollView>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
                <Icon name={'lightbulb-o'} size={30} color={colors.main} />
                <Icon name={'arrows-alt'} size={20} color={colors.main} />
            </View>

        </SafeAreaView>
    )
};

export default Menu;
